package com.zyu;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;
import android.support.v4.view.MotionEventCompat;
import android.view.MotionEvent;

import com.aigestudio.wheelpicker.view.WheelCurvedPicker;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.List;

/**
 * @author <a href="mailto:lesliesam@hotmail.com"> Sam Yu </a>
 */
public class ReactWheelCurvedPicker extends WheelCurvedPicker {

    private final EventDispatcher mEventDispatcher;
    private List<Integer> mValueData;

    /**
     * tells if this instance is ready to dispatch new values
     *
     * added to avoid value dispatch before the user even does a touch on the component
     */
    private boolean ready = false;
    /**
     * tells if either one value has been dispatch
     */
    private boolean firstEventDispatched = false;
    /**
     * last event id, used to dispatch first value into on touch event
     * cannot save the ItemSelectedEvent directly since it is altered at dispatch
     */
    private int lastEventId = 0;
    /**
     * last event value, used to dispatch first value into on touch event
     * cannot save the ItemSelectedEvent directly since it is altered at dispatch
     */
    private int lastEventValue = 0;

    public ReactWheelCurvedPicker(ReactContext reactContext) {
        super(reactContext);
        mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
        setOnWheelChangeListener(new OnWheelChangeListener() {
            @Override
            public void onWheelScrolling(float deltaX, float deltaY) {
            }

            @Override
            public void onWheelSelected(int index, String data) {
                // save last value registered in case we dispatch it from on touch event
                // only the first value will be dispatch from on touch event to mimic the
                // ios wheel picker behavior (emit value at first touch even if value did not
                // change in the picker itself
                if (mValueData != null && index < mValueData.size()) {
                    lastEventId = getId();
                    lastEventValue = mValueData.get(index);
                }

                if (ready) {
                    // the component is ready (is visible and has been touched) we can dispatch the new values now
                    firstEventDispatched = true;
                    mEventDispatcher.dispatchEvent(new ItemSelectedEvent(getId(), mValueData.get(index)));
                }
            }

            @Override
            public void onWheelScrollStateChanged(int state) {
            }
        });
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        this.ready = false;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        // the user can touch the component it means that this component is ready to use
        ready = true;
        if (MotionEventCompat.getActionMasked(event) == MotionEvent.ACTION_UP) {
            // we only dispatch first value using this event
            // to dispatch an initial value at touch even if value does not change in the picker itself
            if (!firstEventDispatched) {
                firstEventDispatched = true;
                mEventDispatcher.dispatchEvent(new ItemSelectedEvent(lastEventId, lastEventValue));
            }
        }
        return super.onTouchEvent(event);
    }

    @Override
    protected void drawForeground(Canvas canvas) {
        super.drawForeground(canvas);

        Paint paint = new Paint();
        paint.setColor(Color.WHITE);
        int colorFrom = 0x00FFFFFF;//Color.BLACK;
        int colorTo = Color.WHITE;
        LinearGradient linearGradientShader = new LinearGradient(rectCurItem.left, rectCurItem.top, rectCurItem.right/2, rectCurItem.top, colorFrom, colorTo, Shader.TileMode.MIRROR);
        paint.setShader(linearGradientShader);
        canvas.drawLine(rectCurItem.left, rectCurItem.top, rectCurItem.right, rectCurItem.top, paint);
        canvas.drawLine(rectCurItem.left, rectCurItem.bottom, rectCurItem.right, rectCurItem.bottom, paint);
    }

    @Override
    public void setItemIndex(int index) {
        super.setItemIndex(index);
        unitDeltaTotal = 0;
        mHandler.post(this);
    }

    public void setValueData(List<Integer> data) {
        mValueData = data;
    }

    public int getState() {
        return state;
    }
}

class ItemSelectedEvent extends Event<ItemSelectedEvent> {

    public static final String EVENT_NAME = "wheelCurvedPickerPageSelected";

    private final int mValue;

    protected ItemSelectedEvent(int viewTag,  int value) {
        super(viewTag);
        mValue = value;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putInt("data", mValue);
        return eventData;
    }
}
