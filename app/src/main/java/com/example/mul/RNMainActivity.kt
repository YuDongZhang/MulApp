package com.example.mul

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * React Native 启动 Activity
 * 使用 DefaultReactActivityDelegate 以兼容 RN 0.82+ New Architecture
 */
class RNMainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "MulApp"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName!!, fabricEnabled)
}

