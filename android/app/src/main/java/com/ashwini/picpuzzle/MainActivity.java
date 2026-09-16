package com.ashwini.picpuzzle;

import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) { // Android 10+
            this.bridge.getWebView().getSettings().setForceDark(WebSettings.FORCE_DARK_OFF);
        }
    }
}