package com.example.mul

import android.os.Bundle
import android.view.KeyEvent
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.shell.MainReactPackage
import io.flutter.embedding.android.FlutterFragment

/**
 * 混合界面 Activity
 * 垂直三段布局同时展示：原生 Android、Flutter、React Native
 */
class HybridScreenActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    companion object {
        private const val TAG_FLUTTER_FRAGMENT = "flutter_fragment"
    }

    private var reactRootView: ReactRootView? = null
    private var reactInstanceManager: ReactInstanceManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_hybrid_screen)

        // 初始化 Flutter Fragment
        initFlutterFragment()

        // 初始化 React Native View
        initReactNativeView()
    }

    /**
     * 初始化 Flutter Fragment
     */
    private fun initFlutterFragment() {
        val fragmentManager = supportFragmentManager
        var flutterFragment = fragmentManager.findFragmentByTag(TAG_FLUTTER_FRAGMENT) as? FlutterFragment

        if (flutterFragment == null) {
            flutterFragment = FlutterFragment.createDefault()
            fragmentManager
                .beginTransaction()
                .add(R.id.flutter_container, flutterFragment, TAG_FLUTTER_FRAGMENT)
                .commit()
        }
    }

    /**
     * 初始化 React Native View
     */
    private fun initReactNativeView() {
        reactRootView = ReactRootView(this)

        // 获取 Application 中的 ReactNativeHost
        val app = application as MulApplication
        reactInstanceManager = app.reactNativeHost.reactInstanceManager

        // 启动 React Native 应用
        reactRootView?.startReactApplication(
            reactInstanceManager,
            "HybridRNComponent", // 专门为混合界面创建的 RN 组件
            null
        )

        // 添加到容器
        val rnContainer = findViewById<android.widget.FrameLayout>(R.id.rn_container)
        rnContainer.addView(reactRootView)
    }

    // ===== React Native 生命周期管理 =====

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onPause() {
        super.onPause()
        reactInstanceManager?.onHostPause(this)
    }

    override fun onResume() {
        super.onResume()
        reactInstanceManager?.onHostResume(this, this)
    }

    override fun onDestroy() {
        super.onDestroy()
        reactRootView?.unmountReactApplication()
        reactRootView = null
    }

    override fun onBackPressed() {
        if (reactInstanceManager != null) {
            reactInstanceManager?.onBackPressed()
        } else {
            super.onBackPressed()
        }
    }

    override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_MENU && reactInstanceManager != null) {
            reactInstanceManager?.showDevOptionsDialog()
            return true
        }
        return super.onKeyUp(keyCode, event)
    }
}
