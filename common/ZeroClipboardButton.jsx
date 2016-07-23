import React,{Component} from "react"

var findOrLoadWasCalled = false;
var readyEventHasHappened = false;
var client,ZeroClipboard;
var loading = {};
// callbacks waiting for ZeroClipboard to load
var waitingForScriptToLoad = [];
// these are the active elements using ZeroClipboardComponent
// each item in the array should be a [element, callback] pair
var eventHandlers = {
    copy: [],
    afterCopy: [],
    error: [],
    ready: []
};
var propToEvent = {
    onCopy: 'copy',
    onAfterCopy: 'afterCopy',
    onError: 'error',
    onReady: 'ready'
};


function loadScript(src, callback){
    if (typeof(window) === 'undefined') return;

    // we don't want duplicate script elements
    // so we use an array of callbacks instead of
    // multiple onload handlers
    if (loading[src]) {
        loading[src].push(callback);
        return;
    }

    // create the array of callbacks
    loading[src] = [callback];

    // create a script, and handle success/failure in node callback style
    var script = document.createElement('script');
    script.onload = function(){
        loading[src].forEach(function(cb){
            cb();
        });
        delete loading[src];
    };

    script.onerror = function(error){
        loading[src].forEach(function(cb){
            cb(error)
        });
        delete loading[src];
    };

    // set the src and append it to the head
    // I believe async is true by default, but there's no harm in setting it
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
};

// add a listener, and returns a remover
var addZeroListener = function(event, el, fn){
    eventHandlers[event].push([el, fn]);
    return function(){
        var handlers = eventHandlers[event];
        for (var i=0; i<handlers.length; i++) {
            if (handlers[i][0] === el) {
                // mutate the array to remove the listener
                handlers.splice(i, 1);
                return;
            }
        }
    };
};

var handleZeroClipLoad = function(error,el){
    if (error) {
        console.error("Couldn't load zeroclipboard from assets.  Copy will not work.  "
            + "Check your Content-Security-Policy.");
        console.error(error);
    }

    // grab it and free up the global
    ZeroClipboard = global.ZeroClipboard;

    // delete global.ZeroClipboard;

    ZeroClipboard.config({
      swfPath: 'assets/lib/ZeroClipboard/ZeroClipboard.swf'
    });
    client = new ZeroClipboard();

    var handleEvent = function(eventName){
        client.on(eventName, function(event){
            // ready has no active element
            if (eventName === 'ready') {
                eventHandlers[eventName].forEach(function(xs){
                    xs[1](event);
                });

                readyEventHasHappened = true;
                return;
            }

            var activeElement = ZeroClipboard.activeElement();

            // find an event handler for this element
            // we use some so we don't continue looking after a match is found
            eventHandlers[eventName].some(function(xs){
                var element = xs[0], callback = xs[1];
                if (element === activeElement) {
                    callback(event);
                    return true;
                }
            });
        });
    };

    for (var eventName in eventHandlers) {
        handleEvent(eventName);
    }

    // call the callbacks when ZeroClipboard is ready
    // these are set in ReactZeroClipboard::componentDidMount
    waitingForScriptToLoad.forEach(function(callback){
        callback();
    });
};

class ZeroClipboardButton extends Component {
  constructor(props){
      super(props)
  }
  render() {
    return (
        <span ref="copyBtn" style={{cursor:"pointer"}}>
          {React.Children.only(this.props.children)}
        </span>
      )
  }

  ready(cb){
    if (findOrLoadWasCalled) return;
    findOrLoadWasCalled = true;

    if (global.ZeroClipboard) {
        handleZeroClipLoad(null);
    }
    else {
        // in production we want the minified version
        var ZERO_CLIPBOARD_SOURCE = "assets/lib/ZeroClipboard/ZeroClipboard.js";
        loadScript(ZERO_CLIPBOARD_SOURCE, handleZeroClipLoad);
    }
    waitingForScriptToLoad.push(cb.bind(this));
  }

  handleCopy(){
      var p = this.props;

      // grab or calculate the different data types
      var text = result(p.getText || p.text);
      var html = result(p.getHtml || p.html);
      var richText = result(p.getRichText || p.richText);

      // give ourselves a fresh slate and then set
      // any provided data types
      client.clearData();
      richText != null && client.setRichText(richText);
      html     != null && client.setHtml(html);
      text     != null && client.setText(text);
  }

  componentWillMount(){

    if (readyEventHasHappened && this.props.onReady) {
        this.props.onReady();
    }
  }
  componentDidMount(){
     // wait for ZeroClipboard to be ready, and then bind it to our element
        this.eventRemovers = [];
        var el = this.refs.copyBtn;

        this.ready(function(){

            client.clip(el);

            // translate our props to ZeroClipboard events, and add them to
            // our listeners
            for (var prop in this.props) {
                var eventName = propToEvent[prop];

                if (eventName && typeof this.props[prop] === "function") {
                    var remover = addZeroListener(eventName, el, this.props[prop]);
                    this.eventRemovers.push(remover);
                }
            }

            // // add text
            this.handleCopy();

            // var remover = addZeroListener("copy", el, this.handleCopy);
            // this.eventRemovers.push(remover);

        });
  }
  componentWillUnmount(){
    var el = this.refs.copyBtn;
    if (client) {
        client.unclip(el);
    }

    // remove our event listener
    this.eventRemovers.forEach(function(fn){ fn(); });
  }
}


function result(fnOrValue) {
    if (typeof fnOrValue === "function") {
        // call it if it's a function
        return fnOrValue();
    }
    else {
        // just return it as is
        return fnOrValue;
    }
}


export default ZeroClipboardButton