package com.example.mul

import android.app.Application
import com.facebook.soloader.SoLoader

/**
 * Application 类
 * 初始化 SoLoader 用于 Flutter 模块
 */
class MulApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
