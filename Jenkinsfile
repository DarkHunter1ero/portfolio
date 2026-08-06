pipeline {
    agent any

    // ─── Environment ─────────────────────────────────────────────
    environment {
        // Vercel deploy token — create at https://vercel.com/account/tokens
        VERCEL_TOKEN      = credentials('VERCEL_TOKEN_FOR_PORTFOLIO')

        // Optional: for Docker registry push
        // DOCKER_REGISTRY   = credentials('docker-registry')
        // DOCKER_IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    // ─── Triggers (optional) ─────────────────────────────────────
    // Uncomment to trigger on push to main:
    // triggers {
    //     pollSCM('')  // webhook-driven; empty cron means webhook only
    // }

    stages {
        // ═══════════════════════════════════════════════════════════
        // CHECKOUT
        // ═══════════════════════════════════════════════════════════
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ═══════════════════════════════════════════════════════════
        // FRONTEND — VALIDATE
        // ═══════════════════════════════════════════════════════════
        stage('Frontend — Validate') {
            parallel {
                stage('Install') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                        }
                    }
                }

                stage('Backend — Install') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Frontend — Lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Frontend — Type Check') {
            steps {
                dir('frontend') {
                    sh 'npm run type-check'
                }
            }
        }

        stage('Frontend — Format Check') {
            steps {
                dir('frontend') {
                    sh 'npm run format'
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // FRONTEND — BUILD
        // ═══════════════════════════════════════════════════════════
        stage('Frontend — Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // BACKEND — BUILD
        // ═══════════════════════════════════════════════════════════
        stage('Backend — Build') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // DEPLOY FRONTEND → VERCEL (production)
        // ═══════════════════════════════════════════════════════════
        stage('Deploy Frontend to Vercel') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Deploy from repo root; Vercel CLI reads vercel.json
                    // and builds according to the framework config.
                    sh '''
                        npx vercel deploy \
                          --prod \
                          --token $VERCEL_TOKEN \
                          --yes \
                          --cwd frontend
                    '''
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // DEPLOY BACKEND → DOCKER (uncomment when ready)
        // ═══════════════════════════════════════════════════════════
        //
        // The Express backend is NOT Vercel-native. Options:
        //   A) Adapt to Vercel Serverless Functions (api/ handlers)
        //   B) Deploy via Docker to Railway / Render / Fly.io / AWS ECS
        //   C) Keep running alongside Vercel frontend on a VPS
        //
        // This stage builds the Docker image and pushes to a registry.
        // stage('Deploy Backend — Docker') {
        //     when { branch 'main' }
        //     steps {
        //         script {
        //             docker.build(
        //                 "portfolio-backend:${env.BUILD_NUMBER}",
        //                 '-f backend/Dockerfile backend/'
        //             )
        //             // Push to registry (uncomment when configured):
        //             // docker.withRegistry('https://registry.example.com', 'docker-registry') {
        //             //     docker.image("portfolio-backend:${env.BUILD_NUMBER}").push()
        //             // }
        //         }
        //     }
        // }

        // ═══════════════════════════════════════════════════════════
        // DOCKER COMPOSE — Integration Smoke Test (optional)
        // ═══════════════════════════════════════════════════════════
        //
        // Spins up both services, hits health check, tears down.
        // stage('Smoke Test — Docker Compose') {
        //     steps {
        //         sh 'docker compose -f docker-compose.yml up -d'
        //         sh 'sleep 15'
        //         sh 'curl --fail http://localhost:3000 || exit 1'
        //         sh 'curl --fail http://localhost:4000/api/health || exit 1'
        //     }
        //     post {
        //         always {
        //             sh 'docker compose -f docker-compose.yml down'
        //         }
        //     }
        // }
    }

    // ─── Post actions ────────────────────────────────────────────
    post {
        success {
            echo '✅ Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed — check logs above'
        }
        always {
            cleanWs()
        }
    }
}
