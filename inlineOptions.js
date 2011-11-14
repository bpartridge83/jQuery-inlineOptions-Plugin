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
        return $.extend({}, $.fn.inlineOptions.defaults, options);
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
        $parent.attr('data-iop', true).data('iop-options', opts);
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
            $parent.find('select').bind('change', function() {
                $.fn.inlineOptions.update($(this).parent());
            });
            $parent.find('a').bind('click', function() {
                $(this).closest('ul').find('select').val($(this).data('value')).trigger('change');
                return false;
            });
        }
        $.fn.inlineOptions.update($parent, false);
        return $el;
    };
    $.fn.inlineOptions.destroy = function(el) {
        var $el;
        if (arguments.length) {
            $el = ($.type(el) === 'object') ? el : $(el);
        } else {
            $el = $('select');
        }
        var opts = $(this).data('iop-options');
        if ($el.parent().hasClass(opts.className)) {
            $el.parent().find('li, span').remove();
            $el.unwrap().unbind('change');
            return $el;
        } else {
            return false;
        }
    };
    $.fn.inlineOptions.update = function(el) {
        var $el, args = arguments;
        if (arguments.length) {
            $el = ($.type(el) === 'object') ? el : $(el);
        } else {
            $el = $('[data-iop]');
        }
        $el.each(function() {
            var opts = $(this).data('iop-options'),
                animate = (args.length > 1) ? args[1] : opts.animate,
                speed = (animate) ? opts.speed : 0,
                option = $(this).find('select option:selected'),
                index = option.index(),
                $parent = option.closest('ul'),
                $a = $parent.find('a').eq(index),
                width = $a.outerWidth(),
                left = $a.position().left;
            $parent.find('.window').stop().animate({
                width: width + 1,
                left: left
            }, speed, opts.easing).fadeIn(speed).find('.wrapper').stop().animate({
                left: -left + 2
            }, speed, opts.easing);
        });
    };
    $.fn.inlineOptions.defaults = {
        animate: true,
        speed: 250,
        className: 'iop',
        easing: 'swing'
    };
})(jQuery);
