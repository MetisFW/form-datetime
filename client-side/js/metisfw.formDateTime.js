/**
 * Client-side script for MetisFW:FormDateTime!
 *
 * @param {jQuery} $ (version > 1.7)
 * @param {Window} window
 * @param {Document} document
 * @param {Location} location
 * @param {Navigator} navigator
 */
;(function($, window, document, location, navigator) {
	/* jshint laxbreak: true, expr: true */
	"use strict";

	var MetisFW = window.MetisFW || {};

	MetisFW.Forms = MetisFW.Forms || {};

	/**
	 * Forms date picker extension definition
	 *
	 * @param {jQuery} $element
	 * @param {Object} options
	 */
	MetisFW.Forms.DateTime = function ($element, options)
	{
		this.$element	= $element;

		this.name		= this.$element.prop('id');
		this.options	= $.extend({}, MetisFW.Forms.DateTime.defaults, options, this.$element.data('settings') || {});
	};

	MetisFW.Forms.DateTime.prototype =
	{
		// Initial function.
		init: function () {
			var that = this;

			this.$dateField	= this.$element.find("input[name*='\\[date\\]']:text");
			this.$timeField	= this.$element.find("input[name*='\\[time\\]']:text");

			this.buttons	= {
				$dateTrigger	: this.$element.find('[data-action="datepicker.show"]'),
				$dateClear		: this.$element.find('[data-action="datepicker.clear"]'),
				$timeTrigger	: this.$element.find('[data-action="timepicker.show"]'),
				$timeClear		: this.$element.find('[data-action="timepicker.clear"]')
			};

			if (this.$element.data('metisFwFormsDatepickerType') == 'uikit') {
				this.type = 'uikit';

				// Init uikit datepicker
				this.uikitPicker();

			} else if (this.$element.data('metisFwFormsDatepickerType') == 'bootstrap') {
				this.type = 'bootstrap';

				// Init bootstrap datepicker
				this.bootstrapPicker();
			}

			this.buttons.$dateTrigger.click(function (event) {
				event.preventDefault();

				that.$dateField.trigger('focus');
				that.$dateField.trigger('click');

				return false;
			});

			this.buttons.$dateClear.click(function (event) {
				event.preventDefault();

				that.$dateField.val('');

				return false;
			});

			this.buttons.$timeTrigger.click(function (event) {
				event.preventDefault();

				that.$timeField.trigger('focus');
				that.$timeField.trigger('click');

				return false;
			});

			this.buttons.$timeClear.click(function (event) {
				event.preventDefault();

				that.$timeField.val('');

				return false;
			});

			return this;
		},

		/**
		 * UIkit date & time picker
		 */
		uikitPicker: function() {
			var that = this;

			// Check if date field exists
			if (this.$dateField.length) {
				// Fix for UIkit different format
				this.options.date.format = this.options.date.format.toUpperCase();

				// Init date picker
				$.UIkit.datepicker(this.$dateField, this.options.date);

				// Listen to uikit events
				this.$dateField.on('update.uk.datepicker', function() {
					// Fire change event
					that.$element.trigger('update.date.MetisFW.forms.datepicker', that.$element.val());
				});

				this.$dateField.on('show.uk.datepicker', function() {
					// Fire change event
					that.$element.trigger('show.date.MetisFW.forms.datepicker');
				});

				this.$dateField.on('hide.uk.datepicker', function() {
					// Fire change event
					that.$element.trigger('hide.date.MetisFW.forms.datepicker');
				});
			}

			// Check if time field exists
			if (this.$timeField.length) {
				// Fix for UIkit different format
				this.options.date.format = this.options.date.showMeridian ? '12h' : '24h';

				// Init time picker
				$.UIkit.timepicker(this.$timeField, this.options.time);
			}
		},

		/**
		 * Bootstrap date & time picker
		 */
		bootstrapPicker: function() {
			var that = this;

			// Check if date field exists
			if (this.$dateField.length) {
				// Init date picker
				this.$dateField.datetimepicker(this.options.date);

				// Listen to bootstrap events
				this.$dateField.on('changeDate', function() {
					// Fire change event
					that.$element.trigger('update.date.MetisFW.forms.datepicker', that.$dateField.val());
				});

				this.$dateField.on('show', function() {
					// Fire change event
					that.$element.trigger('show.date.MetisFW.forms.datepicker');
				});

				this.$dateField.on('hide', function() {
					// Fire change event
					that.$element.trigger('hide.date.MetisFW.forms.datepicker');
				});
			}

			// Check if time field exists
			if (this.$timeField.length) {
				// Init time picker
				this.$timeField.datetimepicker(this.options.time);

				// Listen to bootstrap events
				this.$timeField.on('changeDate', function() {
					// Fire change event
					that.$element.trigger('update.time.MetisFW.forms.datepicker', that.$dateField.val());
				});

				this.$timeField.on('show', function() {
					// Fire change event
					that.$element.trigger('show.time.MetisFW.forms.datepicker');
				});

				this.$timeField.on('hide', function() {
					// Fire change event
					that.$element.trigger('hide.time.MetisFW.forms.datepicker');
				});
			}
		}
	}

	/**
	 * Initialize form date picker plugin
	 *
	 * @param {jQuery} $elements
	 * @param {Object} options
	 */
	MetisFW.Forms.DateTime.initialize = function ($elements, options)
	{
		var nodes = new Array();

		if ($elements.length) {
			nodes = ($elements instanceof jQuery) ? $elements.get() : $elements;

		} else {
			nodes = Array.prototype.slice.call(document.querySelectorAll('[data-metisfw-forms-datepicker]'), 0);
		}

		nodes.forEach(function(item, i){
			if (!item.getAttribute('metisfw-forms-datepicker')) {
				item.setAttribute('metisfw-forms-datepicker', (new MetisFW.Forms.DateTime($(item), options).init()));
			}
		});
	};

	/**
	 * Registering autoload to document
	 *
	 * @param fn
	 */
	MetisFW.Forms.DateTime.ready = function(fn)
	{
		if (document.readyState != 'loading'){
			fn();

		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	};

	/**
	 * MetisFw Forms date picker plugin definition
	 */

	var old = $.fn.metisFwFormsDateTime;

	$.fn.metisFwFormsDateTime = function (options) {
		MetisFW.Forms.DateTime.initialize(this, options);

		return this;
	};

	/**
	 * MEtisFW Forms date picker plugin no conflict
	 */

	$.fn.metisFwFormsDateTime.noConflict = function () {
		$.fn.metisFwFormsDateTime = old;

		return this;
	};

	/**
	 * MEtisFW Forms date picker plugin default settings
	 */

	MetisFW.Forms.DateTime.defaults = {

	};

	/**
	 * Complete plugin
	 */

	MetisFW.Forms.DateTime.ready(MetisFW.Forms.DateTime.initialize);

	// Assign plugin data to DOM
	window.metisFw = MetisFW;

	return MetisFW;

})(jQuery, window, document, location, navigator);
