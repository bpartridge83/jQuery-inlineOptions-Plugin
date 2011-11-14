# InlineOptions jQuery Plugin

Creates inline tab/slider options from traditional `<select>` dropdowns.  When a tab is selected with the inline options, the value of the `<select>` is changed.

[![Inline Selector Screenshot](http://f.cl.ly/items/2b0W3k2c1o0X3V262p32/Screen%20Shot%202011-11-13%20at%2010.22.43%20PM.png "Inline Selector Screenshot")](http://brianpartridge.com/lab/inline-selector/demo/)

####from

![Traditional Dropdown Screenshot](http://f.cl.ly/items/2Z1A3J1W1N1m0E2e272w/Screen%20Shot%202011-11-13%20at%2010.24.15%20PM.png "Traditional Dropdown Screenshot")

Inspiration from [this Dribbble shot](http://dribbble.com/shots/313794-AppStack-GUI "AppStack GUI") by Joel Beukelman ([@joelbeukelman](https://twitter.com/joelbeukelman "Joel Buekelman on Twitter")).

## Demo

Might need to see this one to get a full understanding of what it does... [**Check out the demo here**](http://brianpartridge.com/lab/inline-selector/demo/ "Inline Selector jQuery Plugin Demo")! 

## Usage

1. Render traditional `<select></select>` dropdown markup.
2. Call $('select').inlineOptions(); on a jQuery object (with any/all select objects you want to transform)
3. Include default CSS to style the appended markup
4. Enjoy non-dropdown life.

## Markup

Just use the same HTML markup you would use to render a dropdown.

``` html
<select>
  <option value="option-1">Label 1</option>
  <option value="option-2">Label 2</option>
  <option value="option-3">Label 2</option>
</select>
```

## jQuery

``` js
$('select').inlineOptions();
```

*****

## Optional Configuration

You can customize the speed of the animation and the className rendered as the wrapping parent (for CSS styles).

``` js
$('select').inlineOptions({ speed: 500, className: 'narwhal' });
```

## Update on Manual `<select>` value change

If you change the value of the `<select>` via JavaScript, make sure to manually trigger the `change` event; the plugin will handle the update of the inline options:

``` js
$('select').trigger('change');
```

## Removing Inline Selector

Once it's been installed, you can restore the original markup and dropdown interface by calling the `destroy()` function.

### for all `<select>` elements:

``` js
$.fn.inlineOptions.destroy();
```

### for specific instances:

``` js
$.fn.inlineOptions.destroy('select.this-one');
```

*****

## Support

Currently tested only on Firefox and Chrome on Mac OS X

Feel free to add bugs to the [Issues](https://github.com/bpartridge83/jQuery-inlineOptions-Plugin/issues) list, I'll get to them as soon as possible.