var re=Object.create;var w=Object.defineProperty;var oe=Object.getOwnPropertyDescriptor;var ce=Object.getOwnPropertyNames;var Ee=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var h=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var c=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var ue=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ce(e))!ae.call(n,s)&&s!==t&&w(n,s,{get:()=>e[s],enumerable:!(i=oe(e,s))||i.enumerable});return n};var _e=(n,e,t)=>(t=n!=null?re(Ee(n)):{},ue(e||!n||!n.__esModule?w(t,"default",{value:n,enumerable:!0}):t,n));var b=c(()=>{});var M=c(()=>{});var A=c((Fe,v)=>{"use strict";var C;try{let{app:n}=b();C=n.setAsDefaultProtocolClient.bind(n)}catch{try{C=M()}catch{}}typeof C!="function"&&(C=()=>!1);function Te(){return typeof process<"u"?process.pid:null}var Ie=()=>{let n="";for(let e=0;e<32;e+=1){(e===8||e===12||e===16||e===20)&&(n+="-");let t;if(e===12)t=4;else{let i=Math.random()*16|0;e===16?t=i&3|0:t=i}n+=t.toString(16)}return n};v.exports={pid:Te,register:C,uuid:Ie}});var O=c((d,q)=>{"use strict";var le=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},T=le();q.exports=d=T.fetch;T.fetch&&(d.default=T.fetch.bind(T));d.Headers=T.Headers;d.Request=T.Request;d.Response=T.Response});var H=c((Je,S)=>{"use strict";var de=h("net"),he=h("events"),Ce=O(),{uuid:Ne}=A(),u={HANDSHAKE:0,FRAME:1,CLOSE:2,PING:3,PONG:4};function pe(n){if(process.platform==="win32")return`\\\\?\\pipe\\discord-ipc-${n}`;let{env:{XDG_RUNTIME_DIR:e,TMPDIR:t,TMP:i,TEMP:s}}=process;return`${(e||t||i||s||"/tmp").replace(/\/$/,"")}/discord-ipc-${n}`}function Y(n=0){return new Promise((e,t)=>{let i=pe(n),s=()=>{n<10?e(Y(n+1)):t(new Error("Could not connect"))},o=de.createConnection(i,()=>{o.removeListener("error",s),e(o)});o.once("error",s)})}async function R(n=0){if(n>30)throw new Error("Could not find endpoint");let e=`http://127.0.0.1:${6463+n%10}`;try{return(await Ce(e)).status===404?e:R(n+1)}catch{return R(n+1)}}function m(n,e){e=JSON.stringify(e);let t=Buffer.byteLength(e),i=Buffer.alloc(8+t);return i.writeInt32LE(n,0),i.writeInt32LE(t,4),i.write(e,8,t),i}var I={full:"",op:void 0};function f(n,e){let t=n.read();if(!t)return;let{op:i}=I,s;if(I.full===""){i=I.op=t.readInt32LE(0);let o=t.readInt32LE(4);s=t.slice(8,o+8)}else s=t.toString();try{let o=JSON.parse(I.full+s);e({op:i,data:o}),I.full="",I.op=void 0}catch{I.full+=s}f(n,e)}var L=class extends he{constructor(e){super(),this.client=e,this.socket=null}async connect(){let e=this.socket=await Y();e.on("close",this.onClose.bind(this)),e.on("error",this.onClose.bind(this)),this.emit("open"),e.write(m(u.HANDSHAKE,{v:1,client_id:this.client.clientId})),e.pause(),e.on("readable",()=>{f(e,({op:t,data:i})=>{switch(t){case u.PING:this.send(i,u.PONG);break;case u.FRAME:if(!i)return;i.cmd==="AUTHORIZE"&&i.evt!=="ERROR"&&R().then(s=>{this.client.request.endpoint=s}).catch(s=>{this.client.emit("error",s)}),this.emit("message",i);break;case u.CLOSE:this.emit("close",i);break;default:break}})})}onClose(e){this.emit("close",e)}send(e,t=u.FRAME){this.socket.write(m(t,e))}async close(){return new Promise(e=>{this.once("close",e),this.send({},u.CLOSE),this.socket.end()})}ping(){this.send(Ne(),u.PING)}};S.exports=L;S.exports.encode=m;S.exports.decode=f});var D=c(_=>{"use strict";function g(n){let e={};for(let t of n)e[t]=t;return e}_.browser=typeof window<"u";_.RPCCommands=g(["DISPATCH","AUTHORIZE","AUTHENTICATE","GET_GUILD","GET_GUILDS","GET_CHANNEL","GET_CHANNELS","CREATE_CHANNEL_INVITE","GET_RELATIONSHIPS","GET_USER","SUBSCRIBE","UNSUBSCRIBE","SET_USER_VOICE_SETTINGS","SET_USER_VOICE_SETTINGS_2","SELECT_VOICE_CHANNEL","GET_SELECTED_VOICE_CHANNEL","SELECT_TEXT_CHANNEL","GET_VOICE_SETTINGS","SET_VOICE_SETTINGS_2","SET_VOICE_SETTINGS","CAPTURE_SHORTCUT","SET_ACTIVITY","SEND_ACTIVITY_JOIN_INVITE","CLOSE_ACTIVITY_JOIN_REQUEST","ACTIVITY_INVITE_USER","ACCEPT_ACTIVITY_INVITE","INVITE_BROWSER","DEEP_LINK","CONNECTIONS_CALLBACK","BRAINTREE_POPUP_BRIDGE_CALLBACK","GIFT_CODE_BROWSER","GUILD_TEMPLATE_BROWSER","OVERLAY","BROWSER_HANDOFF","SET_CERTIFIED_DEVICES","GET_IMAGE","CREATE_LOBBY","UPDATE_LOBBY","DELETE_LOBBY","UPDATE_LOBBY_MEMBER","CONNECT_TO_LOBBY","DISCONNECT_FROM_LOBBY","SEND_TO_LOBBY","SEARCH_LOBBIES","CONNECT_TO_LOBBY_VOICE","DISCONNECT_FROM_LOBBY_VOICE","SET_OVERLAY_LOCKED","OPEN_OVERLAY_ACTIVITY_INVITE","OPEN_OVERLAY_GUILD_INVITE","OPEN_OVERLAY_VOICE_SETTINGS","VALIDATE_APPLICATION","GET_ENTITLEMENT_TICKET","GET_APPLICATION_TICKET","START_PURCHASE","GET_SKUS","GET_ENTITLEMENTS","GET_NETWORKING_CONFIG","NETWORKING_SYSTEM_METRICS","NETWORKING_PEER_METRICS","NETWORKING_CREATE_TOKEN","SET_USER_ACHIEVEMENT","GET_USER_ACHIEVEMENTS"]);_.RPCEvents=g(["CURRENT_USER_UPDATE","GUILD_STATUS","GUILD_CREATE","CHANNEL_CREATE","RELATIONSHIP_UPDATE","VOICE_CHANNEL_SELECT","VOICE_STATE_CREATE","VOICE_STATE_DELETE","VOICE_STATE_UPDATE","VOICE_SETTINGS_UPDATE","VOICE_SETTINGS_UPDATE_2","VOICE_CONNECTION_STATUS","SPEAKING_START","SPEAKING_STOP","GAME_JOIN","GAME_SPECTATE","ACTIVITY_JOIN","ACTIVITY_JOIN_REQUEST","ACTIVITY_SPECTATE","ACTIVITY_INVITE","NOTIFICATION_CREATE","MESSAGE_CREATE","MESSAGE_UPDATE","MESSAGE_DELETE","LOBBY_DELETE","LOBBY_UPDATE","LOBBY_MEMBER_CONNECT","LOBBY_MEMBER_DISCONNECT","LOBBY_MEMBER_UPDATE","LOBBY_MESSAGE","CAPTURE_SHORTCUT_CHANGE","OVERLAY","OVERLAY_UPDATE","ENTITLEMENT_CREATE","ENTITLEMENT_DELETE","USER_ACHIEVEMENT_UPDATE","READY","ERROR"]);_.RPCErrors={CAPTURE_SHORTCUT_ALREADY_LISTENING:5004,GET_GUILD_TIMED_OUT:5002,INVALID_ACTIVITY_JOIN_REQUEST:4012,INVALID_ACTIVITY_SECRET:5005,INVALID_CHANNEL:4005,INVALID_CLIENTID:4007,INVALID_COMMAND:4002,INVALID_ENTITLEMENT:4015,INVALID_EVENT:4004,INVALID_GIFT_CODE:4016,INVALID_GUILD:4003,INVALID_INVITE:4011,INVALID_LOBBY:4013,INVALID_LOBBY_SECRET:4014,INVALID_ORIGIN:4008,INVALID_PAYLOAD:4e3,INVALID_PERMISSIONS:4006,INVALID_TOKEN:4009,INVALID_USER:4010,LOBBY_FULL:5007,NO_ELIGIBLE_ACTIVITY:5006,OAUTH2_ERROR:5e3,PURCHASE_CANCELED:5008,PURCHASE_ERROR:5009,RATE_LIMITED:5011,SELECT_CHANNEL_TIMED_OUT:5001,SELECT_VOICE_FORCE_REQUIRED:5003,SERVICE_UNAVAILABLE:1001,TRANSACTION_ABORTED:1002,UNAUTHORIZED_FOR_ACHIEVEMENT:5010,UNKNOWN_ERROR:1e3};_.RPCCloseCodes={CLOSE_NORMAL:1e3,CLOSE_UNSUPPORTED:1003,CLOSE_ABNORMAL:1006,INVALID_CLIENTID:4e3,INVALID_ORIGIN:4001,RATELIMITED:4002,TOKEN_REVOKED:4003,INVALID_VERSION:4004,INVALID_ENCODING:4005};_.LobbyTypes={PRIVATE:1,PUBLIC:2};_.RelationshipTypes={NONE:0,FRIEND:1,BLOCKED:2,PENDING_INCOMING:3,PENDING_OUTGOING:4,IMPLICIT:5}});var x=c(()=>{});var F=c((ze,k)=>{"use strict";var Ae=h("events"),{browser:K}=D(),Se=K?window.WebSocket:x(),Oe=n=>JSON.stringify(n),Re=n=>JSON.parse(n),P=class extends Ae{constructor(e){super(),this.client=e,this.ws=null,this.tries=0}async connect(){let e=6463+this.tries%10;this.tries+=1,this.ws=new Se(`ws://127.0.0.1:${e}/?v=1&client_id=${this.client.clientId}`,K?void 0:{origin:this.client.options.origin}),this.ws.onopen=this.onOpen.bind(this),this.ws.onclose=this.onClose.bind(this),this.ws.onerror=this.onError.bind(this),this.ws.onmessage=this.onMessage.bind(this)}onOpen(){this.emit("open")}onClose(e){e.wasClean&&this.emit("close",e)}onError(e){try{this.ws.close()}catch{}this.tries>20?this.emit("error",e.error):setTimeout(()=>{this.connect()},250)}onMessage(e){this.emit("message",Re(e.data))}send(e){this.ws.send(Oe(e))}ping(){}close(){return new Promise(e=>{this.once("close",e),this.ws.close()})}};k.exports=P});var W=c((Qe,J)=>{"use strict";J.exports={ipc:H(),websocket:F()}});var Q=c((Ze,z)=>{"use strict";var me=h("events"),{setTimeout:Le,clearTimeout:fe}=h("timers"),De=O(),Pe=W(),{RPCCommands:r,RPCEvents:$,RelationshipTypes:ye}=D(),{pid:j,uuid:Ve}=A();function y(n,e){return`${n}${JSON.stringify(e)}`}var V=class extends me{constructor(e={}){super(),this.options=e,this.accessToken=null,this.clientId=null,this.application=null,this.user=null;let t=Pe[e.transport];if(!t)throw new TypeError("RPC_INVALID_TRANSPORT",e.transport);this.fetch=(i,s,{data:o,query:E}={})=>De(`${this.fetch.endpoint}${s}${E?new URLSearchParams(E):""}`,{method:i,body:o,headers:{Authorization:`Bearer ${this.accessToken}`}}).then(async l=>{let N=await l.json();if(!l.ok){let p=new Error(l.status);throw p.body=N,p}return N}),this.fetch.endpoint="https://discord.com/api",this.transport=new t(this),this.transport.on("message",this._onRpcMessage.bind(this)),this._expecting=new Map,this._subscriptions=new Map,this._connectPromise=void 0}connect(e){return this._connectPromise?this._connectPromise:(this._connectPromise=new Promise((t,i)=>{this.clientId=e;let s=Le(()=>i(new Error("RPC_CONNECTION_TIMEOUT")),1e4);s.unref(),this.once("connected",()=>{fe(s),t(this)}),this.transport.once("close",()=>{this._expecting.forEach(o=>{o.reject(new Error("connection closed"))}),this.emit("disconnected"),i(new Error("connection closed"))}),this.transport.connect().catch(i)}),this._connectPromise)}async login(e={}){let{clientId:t,accessToken:i}=e;return await this.connect(t),e.scopes?(i||(i=await this.authorize(e)),this.authenticate(i)):(this.emit("ready"),this)}request(e,t,i){return new Promise((s,o)=>{let E=Ve();this.transport.send({cmd:e,args:t,evt:i,nonce:E}),this._expecting.set(E,{resolve:s,reject:o})})}_onRpcMessage(e){if(e.cmd===r.DISPATCH&&e.evt===$.READY)e.data.user&&(this.user=e.data.user),this.emit("connected");else if(this._expecting.has(e.nonce)){let{resolve:t,reject:i}=this._expecting.get(e.nonce);if(e.evt==="ERROR"){let s=new Error(e.data.message);s.code=e.data.code,s.data=e.data,i(s)}else t(e.data);this._expecting.delete(e.nonce)}else{let t=y(e.evt,e.args);if(!this._subscriptions.has(t))return;this._subscriptions.get(t)(e.data)}}async authorize({scopes:e,clientSecret:t,rpcToken:i,redirectUri:s}={}){t&&i===!0&&(i=(await this.fetch("POST","/oauth2/token/rpc",{data:new URLSearchParams({client_id:this.clientId,client_secret:t})})).rpc_token);let{code:o}=await this.request("AUTHORIZE",{scopes:e,client_id:this.clientId,rpc_token:i});return(await this.fetch("POST","/oauth2/token",{data:new URLSearchParams({client_id:this.clientId,client_secret:t,code:o,grant_type:"authorization_code",redirect_uri:s})})).access_token}authenticate(e){return this.request("AUTHENTICATE",{access_token:e}).then(({application:t,user:i})=>(this.accessToken=e,this.application=t,this.user=i,this.emit("ready"),this))}getGuild(e,t){return this.request(r.GET_GUILD,{guild_id:e,timeout:t})}getGuilds(e){return this.request(r.GET_GUILDS,{timeout:e})}getChannel(e,t){return this.request(r.GET_CHANNEL,{channel_id:e,timeout:t})}async getChannels(e,t){let{channels:i}=await this.request(r.GET_CHANNELS,{timeout:t,guild_id:e});return i}setCertifiedDevices(e){return this.request(r.SET_CERTIFIED_DEVICES,{devices:e.map(t=>({type:t.type,id:t.uuid,vendor:t.vendor,model:t.model,related:t.related,echo_cancellation:t.echoCancellation,noise_suppression:t.noiseSuppression,automatic_gain_control:t.automaticGainControl,hardware_mute:t.hardwareMute}))})}setUserVoiceSettings(e,t){return this.request(r.SET_USER_VOICE_SETTINGS,{user_id:e,pan:t.pan,mute:t.mute,volume:t.volume})}selectVoiceChannel(e,{timeout:t,force:i=!1}={}){return this.request(r.SELECT_VOICE_CHANNEL,{channel_id:e,timeout:t,force:i})}selectTextChannel(e,{timeout:t}={}){return this.request(r.SELECT_TEXT_CHANNEL,{channel_id:e,timeout:t})}getVoiceSettings(){return this.request(r.GET_VOICE_SETTINGS).then(e=>({automaticGainControl:e.automatic_gain_control,echoCancellation:e.echo_cancellation,noiseSuppression:e.noise_suppression,qos:e.qos,silenceWarning:e.silence_warning,deaf:e.deaf,mute:e.mute,input:{availableDevices:e.input.available_devices,device:e.input.device_id,volume:e.input.volume},output:{availableDevices:e.output.available_devices,device:e.output.device_id,volume:e.output.volume},mode:{type:e.mode.type,autoThreshold:e.mode.auto_threshold,threshold:e.mode.threshold,shortcut:e.mode.shortcut,delay:e.mode.delay}}))}setVoiceSettings(e){return this.request(r.SET_VOICE_SETTINGS,{automatic_gain_control:e.automaticGainControl,echo_cancellation:e.echoCancellation,noise_suppression:e.noiseSuppression,qos:e.qos,silence_warning:e.silenceWarning,deaf:e.deaf,mute:e.mute,input:e.input?{device_id:e.input.device,volume:e.input.volume}:void 0,output:e.output?{device_id:e.output.device,volume:e.output.volume}:void 0,mode:e.mode?{mode:e.mode.type,auto_threshold:e.mode.autoThreshold,threshold:e.mode.threshold,shortcut:e.mode.shortcut,delay:e.mode.delay}:void 0})}captureShortcut(e){let t=y($.CAPTURE_SHORTCUT_CHANGE),i=()=>(this._subscriptions.delete(t),this.request(r.CAPTURE_SHORTCUT,{action:"STOP"}));return this._subscriptions.set(t,({shortcut:s})=>{e(s,i)}),this.request(r.CAPTURE_SHORTCUT,{action:"START"}).then(()=>i)}setActivity(e={},t=j()){let i,s,o,E;if(e.startTimestamp||e.endTimestamp){if(i={start:e.startTimestamp,end:e.endTimestamp},i.start instanceof Date&&(i.start=Math.round(i.start.getTime())),i.end instanceof Date&&(i.end=Math.round(i.end.getTime())),i.start>2147483647e3)throw new RangeError("timestamps.start must fit into a unix timestamp");if(i.end>2147483647e3)throw new RangeError("timestamps.end must fit into a unix timestamp")}return(e.largeImageKey||e.largeImageText||e.smallImageKey||e.smallImageText)&&(s={large_image:e.largeImageKey,large_text:e.largeImageText,small_image:e.smallImageKey,small_text:e.smallImageText}),(e.partySize||e.partyId||e.partyMax)&&(o={id:e.partyId},(e.partySize||e.partyMax)&&(o.size=[e.partySize,e.partyMax])),(e.matchSecret||e.joinSecret||e.spectateSecret)&&(E={match:e.matchSecret,join:e.joinSecret,spectate:e.spectateSecret}),this.request(r.SET_ACTIVITY,{pid:t,activity:{state:e.state,details:e.details,timestamps:i,assets:s,party:o,secrets:E,buttons:e.buttons,instance:!!e.instance}})}clearActivity(e=j()){return this.request(r.SET_ACTIVITY,{pid:e})}sendJoinInvite(e){return this.request(r.SEND_ACTIVITY_JOIN_INVITE,{user_id:e.id||e})}sendJoinRequest(e){return this.request(r.SEND_ACTIVITY_JOIN_REQUEST,{user_id:e.id||e})}closeJoinRequest(e){return this.request(r.CLOSE_ACTIVITY_JOIN_REQUEST,{user_id:e.id||e})}createLobby(e,t,i){return this.request(r.CREATE_LOBBY,{type:e,capacity:t,metadata:i})}updateLobby(e,{type:t,owner:i,capacity:s,metadata:o}={}){return this.request(r.UPDATE_LOBBY,{id:e.id||e,type:t,owner_id:i&&i.id||i,capacity:s,metadata:o})}deleteLobby(e){return this.request(r.DELETE_LOBBY,{id:e.id||e})}connectToLobby(e,t){return this.request(r.CONNECT_TO_LOBBY,{id:e,secret:t})}sendToLobby(e,t){return this.request(r.SEND_TO_LOBBY,{id:e.id||e,data:t})}disconnectFromLobby(e){return this.request(r.DISCONNECT_FROM_LOBBY,{id:e.id||e})}updateLobbyMember(e,t,i){return this.request(r.UPDATE_LOBBY_MEMBER,{lobby_id:e.id||e,user_id:t.id||t,metadata:i})}getRelationships(){let e=Object.keys(ye);return this.request(r.GET_RELATIONSHIPS).then(t=>t.relationships.map(i=>({...i,type:e[i.type]})))}subscribe(e,t,i){return!i&&typeof t=="function"&&(i=t,t=void 0),this.request(r.SUBSCRIBE,t,e).then(()=>{let s=y(e,t);return this._subscriptions.set(s,i),{unsubscribe:()=>this.request(r.UNSUBSCRIBE,t,e).then(()=>this._subscriptions.delete(s))}})}async destroy(){await this.transport.close()}};z.exports=V});var U=c((Xe,Z)=>{"use strict";var Ue=A();Z.exports={Client:Q(),register(n){return Ue.register(`discord-${n}`)}}});var X=c(a=>{"use strict";var Ge=a&&a.__createBinding||(Object.create?function(n,e,t,i){i===void 0&&(i=t),Object.defineProperty(n,i,{enumerable:!0,get:function(){return e[t]}})}:function(n,e,t,i){i===void 0&&(i=t),n[i]=e[t]}),Be=a&&a.__exportStar||function(n,e){for(var t in n)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&Ge(e,n,t)},we=a&&a.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(a,"__esModule",{value:!0});a.AutoClient=void 0;var be=we(U()),G=class extends be.default.Client{constructor(e){super(e),this.options=e,e.transport=="ipc"&&this.transport.on("close",this.onClose.bind(this))}onClose(){this.closeinterval||(this.closeinterval=setInterval(()=>{this.transport.connect().then(()=>{this.closeinterval&&clearInterval(this.closeinterval),this.closeinterval=void 0}).catch(()=>{})},15e3),this.closeinterval.unref())}endlessConnect(e){return new Promise(t=>{this.clientId=e;let i=()=>{this.transport.connect(this.clientId).then(()=>{clearInterval(s)}).catch(()=>{})},s=setInterval(i,15e3);s.unref(),i(),this.once("connected",()=>{t()})})}async endlessLogin(e){if(this.options.transport!="ipc")throw new Error("Endless login is currently only supported on the IPC transport");return await this.endlessConnect(e.clientId),e.scopes?(e.accessToken||(e.accessToken=await this.authorize(e)),this.authenticate(e.accessToken)):(this.emit("ready"),this)}};a.AutoClient=G;Be(U(),a)});var te=_e(X());import{currentMediaItem as ee,intercept as Me,store as ve}from"@neptune";import{getMediaURLFromID as qe}from"@neptune/utils";var ie=[],Ye="1130698654987067493",B=n=>n.length>=128?n.slice(0,125)+"...":n,ne=new te.AutoClient({transport:"ipc"}),se=ne.endlessLogin({clientId:Ye});se.then(()=>{ie.push(Me("playbackControls/TIME_UPDATE",([n])=>{let e=ve.getState(),{item:t,type:i}=ee;if(i!=="track")return;let s=qe(t.album.cover),o=new Date,E=o.getTime()/1e3|0,l=o.setSeconds(o.getSeconds()+(t.duration-n)),N=e.playbackControls.playbackState==="NOT_PLAYING";console.log("CHECK !!!!",ee),ne.setActivity({...N?{smallImageKey:"paused-icon",smallImageText:"Paused"}:{smallImageText:"CHEWAWI IS THE GOAT!",smallImageKey:"tidal-icon",startTimestamp:E,endTimestamp:l},details:B(t.title),state:B("by "+t.artists.map(p=>p.name).join(", ")),largeImageKey:s,largeImageText:B(t.album.title)})}))});async function nt(){let n=await se;ie.forEach(e=>e());try{n.clearActivity(),n.destroy()}catch{}}export{nt as onUnload};