pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                script {
                    // Obtener la rama actual desde git (Windows-safe)
                    def rawBranch = bat(
                        script: 'git rev-parse --abbrev-ref HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Rama bruta detectada: ${rawBranch}"

                    // Sanitizar la rama para que Docker la acepte
                    // Solo permite: letras, números, puntos, guiones y subrayados
                    def safe = rawBranch
                        .replaceAll('[^a-zA-Z0-9_.-]', '_')
                        .replace('/', '-') // extra seguridad
                        .trim()

                    env.SAFE_BRANCH = safe

                    echo "SAFE_BRANCH final: ${env.SAFE_BRANCH}"
                }
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat '''
                        echo Instalando dependencias...
                        if not exist node_modules (
                            call npm install
                        ) else (
                            echo node_modules ya existe. Saltando instalación...
                        )

                        echo Construyendo proyecto...
                        call npm run build
                        echo Build admin-frontend completado.
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                        echo Instalando dependencias...
                        if not exist node_modules (
                            call npm install
                        ) else (
                            echo node_modules ya existe. Saltando instalación...
                        )

                        echo Construyendo proyecto...
                        call npm run build
                        echo Build gymetra-frontend completado.
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    echo Verificando estado de los servicios Docker...
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
