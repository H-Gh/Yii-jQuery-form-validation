/**
 * User: h.ghasempour
 * Date: 10/7/2017
 * Time: 9:58 AM
 */

(function ($) {

    $.fn.yiiValidator = function (methodOrOptions) {
        if ($.fn.yiiValidator.methods[methodOrOptions]) {
            return $.fn.yiiValidator.methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return $.fn.yiiValidator.methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist.');
        }
    };

    var baseOptions = {};
    var errors = {};
    var formInitiated = false;
    var rules = [];
    var $this;

    $.fn.yiiValidator.methods = {
        init: function (options) {
            $.extend(baseOptions, options);
        },
        add: function (options) {
            $this = this;
            if (!checks(options, ["model", "attribute", "rules"]))
                return errors;

            formInitiation();

            options.model = options.model.toLowerCase();
            if (options.rules.constructor !== Array)
                options.rules = [options.rules];

            // console.log(options.rules);

            for (var eachRule in options.rules) {
                rules.push({
                    id: options.model + '-' + options.attribute,
                    name: options.model.charAt(0).toUpperCase() + options.model.slice(1) + '[' + options.attribute + ']',
                    container: '.field-' + options.model + '-' + options.attribute,
                    input: '#' + options.model + '-' + options.attribute,
                    error: '.help-block',
                    validate: function (attribute, value, messages, deferred, $form) {
                        options.options = options.options === undefined ? {} : options.options;
                        if(options.rules[eachRule].rule !== undefined && typeof options.rules[eachRule].rule === "function") {
                            if(!options.rules[eachRule].rule(value))
                                messages.push(options.rules[eachRule].errorMessage);
                        } else {
                            var validationOptions = options.options;
                            validationOptions.message = options.rules[eachRule].errorMessage;
                            switch (options.rules[eachRule].rule) {
                                case "number" :
                                    validationOptions.pattern = /^[0-9]+$/g;
                                    break;
                                case "email" :
                                    validationOptions.pattern = /^.*@[1].*\.[a-z]+$/g;
                                    break;
                                case "url" :
                                    validationOptions.pattern = /http(s)?:\/\/(www.)?.*\.[a-z]+$/g;
                                    break;
                            }
                            $.extend(options.options, validationOptions);
                            yii.validation[options.rules[eachRule].rule](value, messages, options.options);
                        }
                    }
                });
                // console.log(rules);
            }

            validation();
        }
    };

    function formInitiation() {
        if (!formInitiated) {
            var interval = setInterval(function () {
                if (typeof $($this).data('yiiActiveForm') !== 'undefined') {
                    clearInterval(interval);
                    formInitiated = true;
                    validation();
                }
            }, 100);
        }
    }

    function checks(object, options) {
        var error = false;
        if (options.constructor !== Array)
            options = [options];
        for (var eachOption in options) {
            if (object[options[eachOption]] === undefined) {
                errors[options[eachOption]] = "The \"" + options[eachOption] + "\" attribute of form should be defined.";
                error = true;
            }
        }

        return !error;
    }

    function validation() {
        if (!formInitiated)
            return;

        for (var eachRule in rules) {
            $($this).yiiActiveForm('add', rules[eachRule]);
        }
    }
})(jQuery);