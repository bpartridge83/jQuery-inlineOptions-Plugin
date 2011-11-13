/*!
 * jQuery inlineOptions Plugin
 * Version: 0.0.1
 * URL: http://github.com/bpartridg83/inlineOptions-jQuery-plugin
 * Description: Transforms <select> options to inline links
 * Requires: jQuery 1.4+
 * Author: Brian Partridge (http://brianpartridge.com)
 * Copyright: Copyright 2011 Brian Partridge
 * License: GPL
 */
(function($) {
    'use strict';
    $.fn.inlineOptions = function(options) {
        $.fn.inlineOptions.options = $.extend({}, $.fn.inlineOptions.defaults, options);
        return this.each(function() {
            var $this = $(this);
            if (!$this.parent().hasClass('iop')) {
                $(this).wrap('<ul class="iop" />');
            }
            var $iop = $this.parent(),
                $options = $this.find('option');
            $iop.append('<span class="window"><span class="wrapper"></span></span>');
            for (var i = 0, arrLen = $options.length; i < arrLen; i += 1) {
                $('<a />', {
                    text: $options.eq(i).text(),
                    href: '#' + $options.eq(i).val()
                }).data('value', $options.eq(i).val()).wrap('<li />').parent().appendTo($iop);
                $('<small />', {
                    text: $options.eq(i).text()
                }).appendTo($iop.find('.wrapper'));
            }
            $iop.find('.window').css({
                height: $iop.height() + 'px'
            });
            $.fn.inlineOptions.update(false);
            $('.iop a').live('click', function() {
                $(this).closest('.iop').find('select').val($(this).data('value'));
                $.fn.inlineOptions.update();
                return false;
            });
        });
    };
    $.fn.inlineOptions.update = function() {
        var animate = (arguments.length) ? arguments[0] : true,
            speed = (animate) ? $.fn.inlineOptions.options.speed : 10;
        $('.iop').each(function() {
            var option = $(this).find('select option:selected'),
                index = option.index(),
                $iop = option.closest('.iop'),
                $a = $iop.find('a').eq(index),
                width = $a.outerWidth(),
                left = $a.position().left;
            $iop.find('.window').animate({
                width: width + 1,
                left: left
            }, speed).fadeIn(speed).find('.wrapper').animate({
                left: -left + 2
            }, speed);
        });
    };
    $.fn.inlineOptions.defaults = {
        speed: 1000
    };
})(jQuery);
