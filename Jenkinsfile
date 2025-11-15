pipeline {
    agent any

    environment {
        DOCKER_IMAGE_PREFIX = 'develop-'
        DOCKER_REGISTRY = 'your-registry.com' // Replace with your Docker registry
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat 'docker build --no-cache -t %DOCKER_IMAGE_PREFIX%admin-frontend:latest .'
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat 'docker build --no-cache -t %DOCKER_IMAGE_PREFIX%gymetra-frontend:latest .'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            bat 'docker system prune -f'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
