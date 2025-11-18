pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                script {
                    // Obtener la rama desde Jenkins
                    def branchName = env.BRANCH_NAME ?: "desconocida"
                    def safeBranch = branchName.replace('/', '-')
                    env.SAFE_BRANCH = safeBranch

                    echo "Rama detectada: ${branchName}"
                    echo "SAFE_BRANCH: ${env.SAFE_BRANCH}"
                }
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat '''
                        echo === ADMIN FRONTEND ===

                        if not exist node_modules (
                            echo Instalando dependencias...
                            call npm install
                        ) else (
                            echo node_modules ya existe. Saltando instalación...
                        )

                        if not exist dist (
                            echo Construyendo proyecto...
                            call npm run build
                        ) else (
                            echo Build ya existe. Saltando compilación...
                        )

                        echo Build admin-frontend completado.
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                        echo === GYMETRA FRONTEND ===

                        if not exist node_modules (
                            echo Instalando dependencias...
                            call npm install
                        ) else (
                            echo node_modules ya existe. Saltando instalación...
                        )

                        if not exist dist (
                            echo Construyendo proyecto...
                            call npm run build
                        ) else (
                            echo Build ya existe. Saltando compilación...
                        )

                        echo Build gymetra-frontend completado.
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    echo === DEPLOY DOCKER COMPOSE ===
                    docker compose ps > status.txt 2>&1

                    findstr /C:"Up" status.txt >nul
                    if %ERRORLEVEL%==0 (
                        echo Servicios ya están arriba. No se recrean.
                    ) else (
                        echo Levantando servicios con build...
                        docker compose up -d --build
                    )

                    echo Deployment completado.
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado."
        }
        failure {
            echo "El pipeline falló."
        }
    }
}
