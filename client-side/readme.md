## Javascript API Documentation

API for Date/Time picker is accessible in global object `window.MetisFW.Forms.DateTime`.

### Loading

Serverside part of Date/Time picker form element is element with custom data attribute `data-metisfw-forms-datepicker`. This element can be initialized with method `initialize()`.

```js
MetisFW.Forms.DateTime.initialize($('[data-metisfw-forms-datepicker]'));
```

But there is shortcut implemented as jQuery plugin:

```js
$('[data-metisfw-forms-datepicker]').metisfwFormsDateTime();
```

You can chain other jQuery methods after this as usual. If you try to initialize one Date/Time picker twice, it will fail silently (second initialization won't proceed).

Finally you can initialize date/time field on the page by calling:

```js
MetisFW.Forms.DateTime.load();
```

This will be automatically called when document is ready.

### Change event

You can listen to event, when date is changed:

```js
$('#foo').on('update.date.metisfw.forms.datepicker', function (e, date) {
	console.log('new date: ', date);
});
```

or when picker is shown or hidden:

```js
$('#foo')
	.on('show.date.metisfw.forms.datepicker', function (e, date) {
		console.log('Picker is displayed');
	})
	.on('hide.date.metisfw.forms.datepicker', function (e, date) {
		console.log('Picker is hidden');
	});
```

This events are also available for time picker but only for bootstrap template:

```js
$('#foo')
	.on('update.time.metisfw.forms.datepicker', function (e, date) {
		console.log('new date: ', date);
	})
	.on('show.time.metisfw.forms.datepicker', function (e, date) {
		console.log('Picker is displayed');
	})
	.on('hide.time.metisfw.forms.datepicker', function (e, date) {
		console.log('Picker is hidden');
	});
```
