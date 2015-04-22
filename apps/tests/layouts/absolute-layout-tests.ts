﻿import TKUnit = require("../TKUnit");
import viewModule = require("ui/core/view");
import labelModule = require("ui/label");
import helper = require("../ui/helper");
import colorModule = require("color");
import layoutHelper = require("./layout-helper");

// <snippet module="ui/layouts/absolute-layout" title="absolute-layout">
// # AbsoluteLayout
// Using a AbsoluteLayout requires the AbsoluteLayout module.
// ``` JavaScript
import absoluteLayoutModule = require("ui/layouts/absolute-layout");
// ```
// </snippet> 

// ### Declaring a AbsoluteLayout.
//```XML
// <Page>
//   <AbsoluteLayout>
//     <Label text="This is Label 1" left="30" top="70" />
//   </AbsoluteLayout>
// </Page>
//```
// </snippet>

export var testAll = function () {
    // <snippet module="ui/layouts/absolute-layout" title="absolute-layout">
    // ## Creating and populating a AbsoluteLayout with children
    // ``` JavaScript
    var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
    absoluteLayout.width = 230;
    absoluteLayout.height = 230;
    absoluteLayout.style.backgroundColor = new colorModule.Color("LightGray");
    var label;
    //// In absolute layout place of an UI element is determined by 4 parameters : left, top, width and height.
    label = new labelModule.Label();
    label.width = 100;
    label.height = 100;
    label.text = "LT";
    label.id = "LT";
    label.style.backgroundColor = new colorModule.Color("Red");
    absoluteLayoutModule.AbsoluteLayout.setLeft(label, 10);
    absoluteLayoutModule.AbsoluteLayout.setTop(label, 10);
    absoluteLayout.addChild(label);
    // ```
    // </snippet>

    helper.buildUIAndRunTest(absoluteLayout, function (views: Array<viewModule.View>) {
        TKUnit.waitUntilReady(function isReady() {
            return absoluteLayout.isLayoutValid;
        }, 1);

        var actualValue = viewModule.getViewById(absoluteLayout, "LT")._getCurrentLayoutBounds();
        var width = actualValue.right - actualValue.left;
        var height = actualValue.bottom - actualValue.top;
        TKUnit.assertEqual(actualValue.left, layoutHelper.dip(10), "ActualLeft");
        TKUnit.assertEqual(actualValue.top, layoutHelper.dip(10), "ActualTop");
        TKUnit.assertEqual(width, layoutHelper.dip(100), "ActualWidth");
        TKUnit.assertEqual(height, layoutHelper.dip(100), "Actualheight");
    });
}

export function test_padding() {
    var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
    absoluteLayout.width = 200;
    absoluteLayout.height = 200;
    absoluteLayout.paddingLeft = 5;
    absoluteLayout.paddingTop = 15;

    // Left Top
    var btn = new layoutHelper.MyButton();
    btn.width = 100;
    btn.height = 100;
    absoluteLayoutModule.AbsoluteLayout.setLeft(btn, 20);
    absoluteLayoutModule.AbsoluteLayout.setTop(btn, 20);
    absoluteLayout.addChild(btn);

    helper.buildUIAndRunTest(absoluteLayout, function (views: Array<viewModule.View>) {
        TKUnit.waitUntilReady(function isReady() {
            return absoluteLayout.isLayoutValid;
        }, 1);

        layoutHelper.assertMeasure(btn, 100, 100);
        layoutHelper.assertLayout(btn, 25, 35, 100, 100);
    });
}
