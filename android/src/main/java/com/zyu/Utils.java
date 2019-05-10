package com.zyu;

import android.graphics.Color;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Utils {

    private static final String REGEXP_HEX = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$";
    private static final String REGEXP_RGB = "^rgb\\((\\d{1,3}), ?(\\d{1,3}), ?(\\d{1,3})\\)$";
    private static final String REGEXP_RGBA = "^rgba\\((\\d{1,3}), ?(\\d{1,3}), ?(\\d{1,3}), ?(0|0.[0-9]+|1)\\)$";

    private static final Pattern PATTERN_RGB = Pattern.compile(REGEXP_RGB);
    private static final Pattern PATTERN_RGBA = Pattern.compile(REGEXP_RGBA);

    public static int parseColor(String color) {
        // Check if this is a Hex color
        if (Pattern.matches(REGEXP_HEX, color)){
            return Color.parseColor(color);
        }
        if (Pattern.matches(REGEXP_RGB, color)) {
            Matcher matcher = PATTERN_RGB.matcher(color);
            matcher.matches();
            String hex = String.format(
                    "#%02x%02x%02x",
                    Integer.parseInt(matcher.group(1)),Integer.parseInt(matcher.group(2)), Integer.parseInt(matcher.group(3))
            );
            return Color.parseColor(hex);
        }
        if (Pattern.matches(REGEXP_RGBA, color)) {
            Matcher matcher = PATTERN_RGBA.matcher(color);
            matcher.matches();
            String hex = String.format(
                    "#%02x%02x%02x%02x",
                    Integer.parseInt(matcher.group(1)), Integer.parseInt(matcher.group(2)), Integer.parseInt(matcher.group(3)), Integer.parseInt(matcher.group(4))
            );
            return Color.parseColor(hex);
        }
        return -1;
    }
}
