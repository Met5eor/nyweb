        var UPGPT = {};
        var cmdQueue = {};
        var SCHEME = 'up';

        var count = new Date().getTime();

        UPGPT.exec = function(cmd, option){
            option = option || {};
            var callbackId = ++count;
            option.callbackId = callbackId;
            cmdQueue[callbackId] = option['callback'] || function(code, opt){};
            delete option['callback'];
            var url = SCHEME + '://["' + cmd + '",' + callbackId + ',' +JSON.stringify(option) + ']';
            prompt("TITLE",url);
        };

        window.nativeCallback = function(callbackId, code, option){

            if(cmdQueue[callbackId])
            {
                cmdQueue[callbackId](code, option);
            }
        };

        ///////////////////////////////////// 事件机制 ///////////////////////////////////

        // 通知客户端事件信息
        function notifyEvent(option)
        {
            var cmd = 'up.event';
            UPGPT.exec(cmd, option);
        }

        /**
         * 创建原生的event对象(全局函数)
         * @param type 类型
         * @param data 数据
         * @returns {Event}
         */
        window.gCreateEvent = function (type, data) {
            var event = document.createEvent('Events');
            event.initEvent(type, false, false);
            if (data)
            {
                for (var i in data)
                {
                    if (data.hasOwnProperty(i))
                    {
                        event[i] = data[i];
                    }
                }
            }
            return event;
        };

        // 一个类型事件对应一个EventMeta实例
        var EventMeta = function (type) {
            this.type = type;
            this.handleMap = {}; // 处理函数Map
            this.count = 0;
            this.onHandleCountChange = null;
        };

        // 全局函数
        window.gEventHandleMap = {
            create: function(type) {
                return gEventHandleMap[type] = new EventMeta(type);
            },
            count: 0 // 句柄标识
        };

        EventMeta.prototype.addEvent = function(handle){
            var flag = handle['upEventFlag'];
            if(!flag)
            {
                flag = gEventHandleMap.count++;
                handle['upEventFlag'] = flag;
            }

            // 同一个类型事件绑定多个相同的处理函数，只执行一次，若想执行多次，必须采用匿名的方式
            if(!this.handleMap[flag])
            {
                this.handleMap[flag] = handle;
                this.count++;
                if(this.count == 1)
                {
                    this.onHandleCountChange && this.onHandleCountChange();
                }
            }
        };


        EventMeta.prototype.removeEvent = function(handle)
        {
            var flag = handle['upEventFlag'];
            if(this.handleMap[flag])
            {
                delete this.handleMap[flag];
                this.count--;
                if(this.count == 0)
                {
                    this.onHandleCountChange && this.onHandleCountChange();
                }
            }
        };

        EventMeta.prototype.fire = function(e)
        {
            if(this.count)
            {
                // copy处理函数，防止在调用处理函数的过程中handleMap发生改变
                var handles = [], i = 0;
                var keys = Object.keys(this.handleMap);
                for(i = 0; i < keys.length; i++)
                {
                    handles.push(this.handleMap[keys[i]]);
                }

                for(i = 0; i < handles.length; i++)
                {
                    handles[i](e);
                }
            }
        };

        // 注册事件(对外API)
        UPGPT.addEventListener = function(type, handle)
        {
            var eventInstance = gEventHandleMap[type];
            if(!eventInstance)
            {
                eventInstance = gEventHandleMap.create(type);
                eventInstance.onHandleCountChange = function(){
                    // 通知客户端
                    notifyEvent({
                        count: this.count,
                        type: type
                    });
                };
            }

            eventInstance.addEvent(handle);
        };

        // 移除事件(对外API)
        UPGPT.removeEventListener = function(type, handle)
        {
            var eventInstance = gEventHandleMap[type];
            if(eventInstance)
            {
                eventInstance.removeEvent(handle);
            }
        };

        // 全局函数事件触发后，客户端调用的函数
        window.nativeFireEvent  = function(type, param)
        {
            var instance = gEventHandleMap[type];
            if(instance)
            {
                var evt = window.gCreateEvent(type, param);
                instance.fire(evt);
            }
        };
        window.UPGPT = UPGPT;

        module.exports = UPGPT;