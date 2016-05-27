;( function( $, window, document, undefined ) {

    "use strict";

        var pluginName = 'vMenu',
            defaults = {
                cloneNav: 'js-subNav'
            },
            self;

        function Plugin (element, options) {
            self = this;
            self.element = element;
            self.settings = $.extend({}, defaults, options);
            self._defaults = defaults;
            self._name = pluginName;
            self.navList = $(self.element);
            if (self.settings.wrapper) {
              self.nav = $('.' + self.settings.wrapper);
            } else {
              self.nav = self.navList.parent();
            }
            self.navWidth = self.nav.width();
            self.init();
            return this;
        }

        $.extend(Plugin.prototype, {

            init: function() {
                $('body').append('<ul class="'+ self.settings.cloneNav +'"></ul>');
                self.subNav = $('.' + self.settings.cloneNav);
                self.nav.addClass('js-nav');
                self.navList.children().each(function() {
                    $(this).data('width', $(this).outerWidth());
                });

                self.hide();

                $(window).on('resize.' + self._name, function (event) {
                  (self.nav.width() > self.navWidth) ? self.show() : self.hide();
                  self.navWidth = self.nav.width();
                });
            },

            hide: function() {
                var width = 0;
                self.navList.children().each(function() {
                    width += $(this).data('width');
                    if (width > self.navWidth) {
                        $(this).prev()
                            .nextAll()
                            .prependTo(self.subNav);
                        return false;
                    }
                });
            },

            show: function() {
                var width = 0;
                self.navList.children().each(function() {
                    width += $(this).data('width');
                });
                self.subNav.children().each(function() {
                    width += $(this).data('width');

                    if (width < self.navWidth) {
                        $(this).appendTo(self.navList);
                    } else {
                        return false;
                    }
                });
            },

            update: function() {
                var width = 0;
                self.navList.children().each(function() {
                    $(this).data('width', $(this).outerWidth());
                    width += $(this).data('width');
                });
                if (width > self.navWidth) {
                   self.hide();
                } else {
                    self.show();
                }
            },

            destroy: function() {
                $(window).off('resize.' + self._name);
                self.nav.removeClass('js-nav');
                self.subNav.children().each(function() {
                    $(this).appendTo(self.navList);
                });
                self.subNav.remove();
                self.navList.children().each(function() {
                    $(this).removeData();
                });
            }

        });

        $.fn[pluginName] = function(options) {
            var args = arguments;

            if (options === undefined || typeof options === 'object') {
                return this.each(function () {
                    if (!$.data(this, 'plugin_' + pluginName)) {
                        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                    }
                });
            } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
                var returns;
                this.each(function () {
                    var instance = $.data(this, 'plugin_' + pluginName);
                    if (instance instanceof Plugin && typeof instance[options] === 'function') {
                        returns = instance[options].apply( instance, Array.prototype.slice.call(args, 1));
                    }
                    if (options === 'destroy') {
                      $.data(this, 'plugin_' + pluginName, null);
                    }
                });
                return returns !== undefined ? returns : this;
            }
        };

} )( jQuery, window, document );
