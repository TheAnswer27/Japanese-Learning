# 1. 建立專案 Namespace
resource "kubernetes_namespace" "app_ns" {
  metadata {
    name = "japanese-learning"
  }
}

# ==========================================
# 2. MySQL 資料庫 (StatefulSet + PVC + Service)
# ==========================================
resource "kubernetes_service" "mysql_svc" {
  metadata {
    name      = "mysql"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    selector = {
      app = "mysql"
    }
    port {
      port        = 3306
      target_port = 3306
    }
    type = "ClusterIP"
  }
}

resource "kubernetes_stateful_set" "mysql" {
  metadata {
    name      = "mysql"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    service_name = "mysql"
    replicas     = 1
    selector {
      match_labels = {
        app = "mysql"
      }
    }
    template {
      metadata {
        labels = {
          app = "mysql"
        }
      }
      spec {
        container {
          image = "mysql:8.0"
          name  = "mysql"
          port {
            container_port = 3306
          }
          env {
            name  = "MYSQL_ROOT_PASSWORD"
            value = "rootpassword"
          }
          env {
            name  = "MYSQL_DATABASE"
            value = "japanese_db" # 對應 Node.js 後端要求的資料庫名稱
          }
          volume_mount {
            name       = "mysql-data"
            mount_path = "/var/lib/mysql"
          }
        }
      }
    }
    volume_claim_template {
      metadata {
        name = "mysql-data"
      }
      spec {
        access_modes = ["ReadWriteOnce"]
        resources {
          requests = {
            storage = "1Gi"
          }
        }
      }
    }
  }
}

# ==========================================
# 3. 後端 (Backend Deployment + Service)
# ==========================================
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend"
        }
      }
      spec {
        container {
          image = "ghcr.io/theanswer27/japanese-learning-backend:latest"
          name  = "backend"
          port {
            container_port = 3000 # 對應 Node.js 實際運行的 3000 埠
          }
          env {
            name  = "DB_HOST"
            value = "mysql"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend_svc" {
  metadata {
    name      = "backend-svc"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    selector = {
      app = "backend"
    }
    port {
      port        = 3000
      target_port = 3000
    }
    type = "ClusterIP"
  }
}

# ==========================================
# 4. 前端 (Frontend Deployment + Service)
# ==========================================
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "frontend"
      }
    }
    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }
      spec {
        container {
          image = "ghcr.io/theanswer27/japanese-learning:latest"
          name  = "frontend"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend_svc" {
  metadata {
    name      = "frontend-svc"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    selector = {
      app = "frontend"
    }
    port {
      port        = 80
      target_port = 80
    }
    type = "ClusterIP"
  }
}

# ==========================================
# 5. 前端對外連線 (OpenShift Route)
# ==========================================
resource "kubernetes_manifest" "frontend_route" {
  manifest = {
    apiVersion = "route.openshift.io/v1"
    kind       = "Route"
    metadata = {
      name      = "frontend-route"
      namespace = kubernetes_namespace.app_ns.metadata[0].name
    }
    spec = {
      to = {
        kind = "Service"
        name = "frontend-svc"
      }
      port = {
        targetPort = 80
      }
      tls = {
        termination = "edge"
      }
    }
  }
}

# ==========================================
# 6. 後端對外連線 (OpenShift Route)
# ==========================================
resource "kubernetes_manifest" "backend_route" {
  manifest = {
    apiVersion = "route.openshift.io/v1"
    kind       = "Route"
    metadata = {
      name      = "backend-route"
      namespace = kubernetes_namespace.app_ns.metadata[0].name
    }
    spec = {
      to = {
        kind = "Service"
        name = "backend-svc"
      }
      port = {
        targetPort = 3000 # 對應後端的 3000 埠
      }
      tls = {
        termination = "edge"
      }
    }
  }
}