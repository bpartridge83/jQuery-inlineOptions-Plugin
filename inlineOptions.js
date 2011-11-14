/*!
 * jQuery inlineOptions Plugin
 * Version: 0.1.0
 * URL: http://github.com/bpartridg83/jQuery-inlineOptions-Plugin
 * Description: Transforms <select> options to inline links
 * Requires: jQuery 1.4+
 * Author: Brian Partridge (http://brianpartridge.com)
 * Copyright: Copyright 2011 Brian Partridge
 * License: GPL
 */
(function($) {
    'use strict';
    $.fn.inlineOptions = function(options) {
        return this.each(function() {
            $.fn.inlineOptions.create($(this), options);
        });
    };
    $.fn.inlineOptions.set = function(options) {
        $.fn.inlineOptions.options = $.extend({}, $.fn.inlineOptions.defaults, options);
        return $.fn.inlineOptions.options;
    };
    $.fn.inlineOptions.create = function(el, options) {
        var $el = ($.type(el) === 'object') ? el : $(el);
        var opts = $.fn.inlineOptions.set(options);
        if (!$el.parent().hasClass(opts.className)) {
            var $temp = $('<ul />', {
                'class': opts.className
            });
            $el.wrap($temp);
        }
        var $parent = $el.parent(),
            $options = $el.find('option');
        if (!$parent.find('small').length) {
            $parent.append('<span class="window"><span class="wrapper"></span></span>');
            for (var i = 0, arrLen = $options.length; i < arrLen; i += 1) {
                $('<a />', {
                    text: $options.eq(i).text(),
                    href: '#' + $options.eq(i).val()
                }).data('value', $options.eq(i).val()).wrap('<li />').parent().appendTo($parent);
                $('<small />', {
                    text: $options.eq(i).text()
                }).appendTo($parent.find('.wrapper'));
            }
            $parent.find('.window').css({
                height: $parent.height() + 'px'
            });
            $parent.find('a').bind('click', function() {
                $(this).closest('ul').find('select').val($(this).data('value'));
                $.fn.inlineOptions.update();
                return false;
            });
        }
        $.fn.inlineOptions.update(false);
        return $el;
    };
    $.fn.inlineOptions.destroy = function(el) {
        var $el;
        if (arguments.length) {
            $el = ($.type(el) === 'object') ? el : $(el);
        } else {
            $el = $('select');
        }
        $el.parent().find('li, span').remove();
        $el.unwrap();
        return $el;
    };
    $.fn.inlineOptions.update = function() {
        var animate = (arguments.length) ? arguments[0] : true,
            speed = (animate) ? $.fn.inlineOptions.options.speed : 10;
        console.log(speed);
        $('.' + $.fn.inlineOptions.options.className).each(function() {
            var option = $(this).find('select option:selected'),
                index = option.index(),
                $parent = option.closest('ul'),
                $a = $parent.find('a').eq(index),
                width = $a.outerWidth(),
                left = $a.position().left;
            $parent.find('.window').stop().animate({
                width: width + 1,
                left: left
            }, speed).fadeIn(speed).find('.wrapper').stop().animate({
                left: -left + 2
            }, speed);
        });
    };
    $.fn.inlineOptions.defaults = {
        speed: 250,
        className: 'iop'
    };
})(jQuery);
