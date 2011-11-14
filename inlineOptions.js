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
    var iop = {
        init: function(options) {
            this.each(function() {
                var opts = (options) ? options : $(this).data('iop');
                iop.create($(this), opts);
            });
        },
        create: function(el, opts) {
            var $el = (typeof el === 'object') ? el : $(el);
            opts = $.extend({}, this.defaults, opts);
            if (!$el.parent().hasClass(opts.className)) {
                $el.wrap($('<ul />', {
                    'class': opts.className
                }));
            }
            var $options = $el.find('option'),
                $parent = $el.parent().attr('data-iop', true).data('iop-opts', opts);
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
                    $.fn.inlineOptions('update', $(this).parent());
                });
                $parent.find('a').bind('click', function() {
                    $(this).closest('ul').find('select').val($(this).data('value')).trigger('change');
                    return false;
                });
            }
            this.update($parent, false);
        },
        destroy: function(el) {
            var $el;
            if (this.length) {
                $el = this;
            } else if (arguments.length) {
                $el = (typeof el === 'object') ? el : $(el);
            } else {
                $el = $('select');
            }
            var $parent = $el.parent(),
                opts = $parent.data('iop-opts');
            if ($parent.hasClass(opts.className)) {
                $parent.find('li, span').remove();
                $el.unwrap().unbind('change');
                return $el;
            } else {
                return false;
            }
        },
        update: function(el, animate) {
            var $el, args = arguments;
            if (args.length) {
                $el = (typeof el === 'object') ? el : $(el);
            } else {
                $el = $('[data-iop]');
            }
            $el.each(function() {
                var opts = $(this).data('iop-opts'),
                    animate = (args.length > 1) ? args[1] : opts.animate,
                    speed = (animate) ? opts.speed : 0,
                    option = $(this).find(':selected'),
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
        },
        defaults: {
            animate: true,
            speed: 250,
            className: 'iop',
            easing: 'swing'
        }
    };
    $.fn.inlineOptions = function(method) {
        if (iop[method]) {
            return iop[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return iop.init.apply(this, arguments);
        } else {
            return '$.fn.inlineOptions: "' + method + '" does not exist';
        }
    };
})(jQuery);
