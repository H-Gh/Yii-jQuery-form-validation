# Yii-jQuery-form-validation
This plugin runs custom validations on custom fileds which are not in Yii model.

<h2>Usage</h2>
<h4>php</h4>

```php
<div class="form-group field-model-model_attribute_1">
  <?php
    // the format of should be like this modelName-attributeName. eg : model is book, attribute of model is name => book-name
    echo Html::label("Label", "model-model_attribute_1"); ?>
    echo Html::textInput("Campaign[model_attribute_1]", null, [
      "class" => "form-control",
      "id" => "model-model_attribute_1"
    ]);
  ?>
  <div class="help-block"></div>
</div>
```

<h4>jQuery</h4>

```javascript
  var $form = $('#form');
  $form.yiiValidator('add', {
        model: "model",
        attribute: "model_attribute_1",
        rules: // ...
    });
```

<h2>methods</h2>
<h4>add</h4>

```javascript
var $form = $('#form');
$form.yiiValidator('add', {
  //...
});
```

<h2>Rules</h2>
Rules can be a single object or array of objects.

```javascript
rules : {
  //...
}
rules : [
  {
    //...
  },
  {
    //...
  }
];
```

Each rule consists of two element :
```
  rule
  errorMessage
```

Rule can be selected from below list or be a function.
```
required
number
email
url
```

```javascript
rule : function(value) {
  //...
}
```

<h2>Example</h2>

```javascript
var $form = $('#form');
$form.yiiValidator('add', {
        model: "model",
        attribute: "model_attribute_1",
        rules: [{
            rule: "required",
            errorMessage: "should fill"
        }]
    });
```

```javascript
var $form = $('#form');
$form.yiiValidator('add', {
        model: "model",
        attribute: "model_attribute_2",
        rules: [
            {rule : "required", errorMessage : "should fill"},
            {
                rule: function (value) {
                    return value > 0 && value !== "";
                },
                errorMessage: "should more than zero!",
            }
        ]
    });
```
