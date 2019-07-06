<?php
/**
 * User: h.ghasempour
 * Date: 7/6/2019
 * Time: 2:52 PM
 */

namespace hgh\yiiJqueryFormValidation;

/**
 * Class YiiJqueryFormValidationAsset
 */
class YiiJqueryFormValidationAsset extends yii\web\AssetBundle
{
    public $sourcePath = '@vendor/hgh/yii2-jquery-validation/res';

    public $js = [
        "js/yiiValidator.js"
    ];
}