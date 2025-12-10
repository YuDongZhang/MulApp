pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_PROJECT)
    repositories {
        google()
        mavenCentral()
        // Flutter module release repository
        maven {
            url = uri("${rootProject.projectDir}/flutter_module/build/host/outputs/repo")
        }
        maven {
            url = uri("https://storage.googleapis.com/download.flutter.io")
        }

        // React Native 本地 Maven 仓库
        maven {
            url = uri("$rootDir/node_modules/react-native/android")
        }

        // Hermes 引擎仓库
        maven {
            url = uri("https://repo.maven.apache.org/maven2")
        }
        
        // JSC (JavaScript Core) 仓库
        maven {
            url = uri("$rootDir/node_modules/jsc-android/dist")
        }
    }
}

rootProject.name = "MulApp"
include(":app")



