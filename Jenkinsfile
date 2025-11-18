pipeline {
    agent any

    environment {
        DOCKER_IMAGE_PREFIX = 'develop-'
        DOCKER_REGISTRY = 'your-registry.com'
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
                    sh '''
                    IMAGE="{$DOCKER_IMAGE_PREFIX}admin-frontend:latest"

                    if ! docker image inspect "$IMAGE" > /dev/null 2>&1; then
                        echo "Building admin-frontend image..."
                        docker build --no-cache -t $DOCKER_IMAGE_PREFIXadmin-frontend:latest .
                    else
                        echo "admin-frontend image already exists, skipping build."
                    fi
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    sh '''
                    IMAGE="${DOCKER_IMAGE_PREFIX}gymetra-frontend:latest"

                    if ! docker image inspect "$IMAGE" > /dev/null 2>&1; then
                        echo "Building gymetra-frontend image..."
                        docker build --no-cache -t ${DOCKER_IMAGE_PREFIX}gymetra-frontend:latest .
                    else
                        echo "gymetra-frontend image already exists, skipping build."
                    fi
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
