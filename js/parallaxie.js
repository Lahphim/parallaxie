(function( $ ){
  var methods  = {
    init: function( options ) {
      return this.each(function() {
        var obj = $( this ),
            opt = options,
            $bgsContainer  = $.fn.parallaxie.structure( obj, opt );

        $.fn.parallaxie.buildSelfCss( opt.animate );

        $bgsContainer.attr('data-bg-freeze', opt.freeze);

        $( window ).scroll(function ( e ) {
          var _amount = $( window ).scrollTop();
          
          if( !$bgsContainer.data().bgFreeze ) {
            $.each( $bgsContainer.find( '.parallaxie' ), function( idx, ele ) {
              var $ele = $( ele ),
                  _speed = $ele.data().bgSpeed;

              $ele.css( 'background-position', '0 -' + ( _amount * _speed ) + 'px' );
            });
          }
        });
      });
    },

    freeze: function(  ) {
      this.each(function() {
        var obj = $( this );

        obj.data('bgFreeze', true);
      });
    },

    unfreeze: function(  ) {
      this.each(function() {
        var obj = $( this );

        obj.data('bgFreeze', false);
      });
    }
  };
  
  // plugin definition
  $.fn.parallaxie = function( options ) {
    if( typeof options === 'object' || !options ) {
      var options = $.extend( $.fn.parallaxie.defaults, options );
      
      return methods.init.apply( this, [options] );
    } else if ( methods[options] ) {
      return methods[options].apply( this );
    }
  };

  $.fn.parallaxie.structure = function( obj, opt ) {
    var id      = obj.attr( 'id' ),
        bgHtmlArr  = [];

    $.each(opt.backgrounds, function( idx, bg ) {
      var bgHtml    = '',
          bgOptions = $.extend( $.fn.parallaxie.bgDefaults, bg );

      // update each bg options
      opt.backgrounds[idx] = bgOptions;

      bgHtml += '<div class="parallaxie parallaxie-ele-' + ( idx + 1 ) + '" ';
        bgHtml += 'data-bg-speed="' + ( bgOptions.speed == undefined
                                        ? ( ( opt.treasholdSpeed / opt.backgrounds.length ) * ( opt.backgrounds.length - idx ) )
                                        : bgOptions.speed ) + '"';
        bgHtml += 'style="background:url(' + bgOptions.path + '); z-index:-' + ( bgOptions.depth == undefined
                                                                                  ? ( idx + 1 ) : bgOptions.depth ) + ';"';
      bgHtml += ' >';
      bgHtml += '</div>';

      bgHtmlArr.push( bgHtml );      
    });

    return $( obj ).html( bgHtmlArr.join( '' ) ); 
  };

  $.fn.parallaxie.buildSelfCss = function( animateOpt ) {
    var css = '',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    css += '.parallaxie {';
      css += 'position: fixed;';
      css += 'width: 100%;';
      css += 'height: 100%;';
      css += 'bottom: 0;';
      css += 'left: 0;';

      css += '-webkit-transition: background-position ' + animateOpt.timer + 'ms ' + animateOpt.easing + ';';
      css += '-moz-transition: background-position ' + animateOpt.timer + 'ms ' + animateOpt.easing + ';';
      css += 'transition: background-position ' + animateOpt.timer + 'ms ' + animateOpt.easing + ';';
    css += '}';

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  };

  // defaults for each background in array
  $.fn.parallaxie.bgDefaults = {
    path: null,
    speed: null,
    depth: null,
    direction: 'top-up'
  };

  // plugin defaults for this plugin
  $.fn.parallaxie.defaults = {
    animate: {
      timer: 300,         // ms
      easing: 'linear'
    },
    speed: 100,           // amount of 1 tik wheel scroll
    treasholdSpeed: 0.5,  // treashold amount of background moving, this mean 50% of speed (fine treashold)
    freeze: false, 
    filter: 0.0,
    backgrounds: []
  };
})( jQuery );