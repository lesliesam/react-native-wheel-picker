package com.zyu;

import android.graphics.Color;

import com.aigestudio.wheelpicker.WheelPicker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author <a href="mailto:lesliesam@hotmail.com"> Sam Yu </a>
 */
public class ReactWheelCurvedPickerManager extends SimpleViewManager<ReactWheelCurvedPicker> {

    private static final String REACT_CLASS = "WheelCurvedPicker";

    private static final int DEFAULT_TEXT_SIZE = 25 * 2;
    private static final int DEFAULT_ITEM_SPACE = 14 * 2;

    @Override
    protected ReactWheelCurvedPicker createViewInstance(ThemedReactContext reactContext) {
        ReactWheelCurvedPicker picker = new ReactWheelCurvedPicker(reactContext);
        // 设置数据项文本颜色
        picker.setItemTextColor(Color.LTGRAY);

        // 设置数据项文本尺寸大小
        picker.setItemTextSize(DEFAULT_TEXT_SIZE);

        // 设置当前选中的数据项文本颜色
        picker.setSelectedItemTextColor(Color.WHITE);

        // 设置滚轮选择器数据项之间间距
        picker.setItemSpace(DEFAULT_ITEM_SPACE);

        // 设置滚轮选择器是否显示指示器
        picker.setIndicator(true);

        // 设置滚轮选择器指示器尺寸
        picker.setIndicatorSize(2);

        // 设置滚轮选择器指示器颜色
        picker.setIndicatorColor(Color.WHITE);

        // 设置滚轮选择器是否显示幕布
        picker.setCurtain(false);

        // 设置滚轮选择器幕布颜色
        picker.setCurtainColor(Color.YELLOW);

        // 设置滚轮选择器是否有空气感
        picker.setAtmospheric(true);

        // 滚轮选择器是否开启卷曲效果
        picker.setCurved(true);

        // 设置滚轮选择器可见数据项数量
        picker.setVisibleItemCount(5);

        /**
         * 设置滚轮选择器数据项的对齐方式
         * ALIGN_CENTER = 0, ALIGN_LEFT = 1, ALIGN_RIGHT = 2;
         */
        picker.setItemAlign(0);

        return picker;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                ItemSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onValueChange")
        );
    }

    @ReactProp(name="data")
    public void setData(ReactWheelCurvedPicker picker, ReadableArray items) {
        if (picker != null) {
            ArrayList<Integer> valueData = new ArrayList<>();
            ArrayList<String> labelData = new ArrayList<>();
            for (int i = 0; i < items.size(); i ++) {
                ReadableMap itemMap = items.getMap(i);
                valueData.add(itemMap.getInt("value"));
                labelData.add(itemMap.getString("label"));
            }
            picker.setValueData(valueData);
            picker.setData(labelData);
        }
    }

    @ReactProp(name="selectedIndex")
    public void setSelectedIndex(ReactWheelCurvedPicker picker, int index) {
        if (picker != null && picker.getState() == WheelPicker.SCROLL_STATE_IDLE) {
            picker.setSelectedItemPosition(index);
            picker.invalidate();
        }
    }

    @ReactProp(name="textColor", customType = "Color")
    public void setTextColor(ReactWheelCurvedPicker picker, Integer color) {
        if (picker != null) {
            picker.setItemTextColor(color);
        }
    }

    @ReactProp(name="curtainColor", customType = "Color")
    public void setCurtainColor(ReactWheelCurvedPicker picker, Integer color) {
        if (picker != null) {
            picker.setCurtainColor(color);
        }
    }

    @ReactProp(name="textSize")
    public void setTextSize(ReactWheelCurvedPicker picker, int size) {
        if (picker != null) {
            picker.setItemTextSize((int) PixelUtil.toPixelFromDIP(size));
        }
    }

    @ReactProp(name="itemSpace")
    public void setItemSpace(ReactWheelCurvedPicker picker, int space) {
        if (picker != null) {
            picker.setItemSpace((int) PixelUtil.toPixelFromDIP(space));
        }
    }


    // 设置滚轮选择器是否显示指示器
    @ReactProp(name="indicator")
    public void setIndicator(ReactWheelCurvedPicker picker, boolean hasIndicator) {
        if (picker != null) {
            picker.setIndicator(hasIndicator);
        }
    }
    // 设置滚轮选择器指示器颜色
    @ReactProp(name="indicatorColor", customType = "Color")
    public void setIndicatorColor(ReactWheelCurvedPicker picker, Integer color) {
        if (picker != null) {
            picker.setIndicatorColor(color);
        }
    }
    // 设置滚轮选择器指示器尺寸
    @ReactProp(name="indicatorSize")
    public void setIndicatorSize(ReactWheelCurvedPicker picker, int size) {
        if (picker != null) {
            picker.setIndicatorSize(size);
        }
    }

    // 设置滚轮选择器是否显示幕布
    @ReactProp(name="curtain")
    public void setCurtain(ReactWheelCurvedPicker picker, boolean hasCurtain) {
        if (picker != null) {
            picker.setCurtain(hasCurtain);
        }
    }
    // 设置滚轮选择器幕布颜色
    @ReactProp(name="selectTextColor", customType = "Color")
    public void setSelectedTextColor(ReactWheelCurvedPicker picker, Integer color) {
        if (picker != null) {
            picker.setSelectedItemTextColor(color);
        }
    }

    // 设置滚轮选择器是否有空气感
    @ReactProp(name="atmospheric")
    public void setAtmospheric(ReactWheelCurvedPicker picker, boolean hasAtmospheric) {
        if (picker != null) {
            picker.setAtmospheric(hasAtmospheric);
        }
    }
    // 滚轮选择器是否开启卷曲效果
    @ReactProp(name="curved")
    public void setCurved(ReactWheelCurvedPicker picker, boolean hasCurved) {
        if (picker != null) {
            picker.setCurved(hasCurved);
        }
    }
    // 设置滚轮选择器可见数据项数量
    @ReactProp(name="visibleItemCount")
    public void setVisibleItemCount(ReactWheelCurvedPicker picker, int num) {
        if (picker != null) {
            picker.setVisibleItemCount(num);
        }
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
