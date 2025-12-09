package com.example.mul

import android.app.Application

import com.facebook.soloader.SoLoader

/**
 * Application 类
 * 实现 ReactApplication 接口以支持 React Native
 * 同时保持 Flutter 模块的兼容性
 */
class MulApplication : Application(){


    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {

        }
    }
}

