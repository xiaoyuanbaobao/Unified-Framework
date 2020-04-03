/*************************************************************************
*
*			Request 对象的接口
*
**************************************************************************/
var Request = {};

Request.TotalBytes = 0;

Request.QueryString = function (variable) {
    /// <summary>QueryString 集合用于取回 HTTP 查询字符串中的变量值。</summary>
    /// <param name="variable" type="string">必需。在 HTTP 查询字符串中要取回的变量名称。</param>
    /// <returns type="variable">返回查询变量的值</returns>
};

Request.Form = function (element) {
    /// <summary>Form 集合用于从使用 POST 方法的表单获取表单元素的值。</summary>
    /// <param name="element" type="string">必需。表单元素的名称，此集合从中取回值。</param>
    /// <returns type="variable">返回对应表单元素的值</returns>
};

Request.Cookies = function (name) {
    /// <summary>Cookies 集合用于设置或取得 cookie 的值。如果 cookie 不存，就创建它，并赋予它规定的值。</summary>
    /// <param name="name" type="string">必需。cookie 的名称。</param>
};

Request.ServerVariables = function (server_variable) {
    /// <summary>ServerVariables 集合用于取回服务器变量的值。</summary>
    /// <param name="server_variable" type="string">必需。要取回的服务器变量的名称。</param>
    /// <returns type="variable">返回查询变量的值</returns>
};

Request.Read = function () {
    /// <summary>Read 方法用于获取作为 POST 请求的部分从客户机发送到服务器的文本数据。</summary>
    /// <returns type="text">返回从客户机发送到服务器的数据</returns>
};

Request.BinaryRead = function () {
    /// <summary>BinaryRead 方法用于获取作为 POST 请求的部分从客户机发送到服务器的数据。</summary>
    /// <returns type="data">返回从客户机发送到服务器的数据</returns>
};
/*************************************************************************
*
*			Response 对象的接口
*
**************************************************************************/
var Response = {};

Response.Buffer = false;
Response.ContentCode = 1;
Response.ContentType = "text/html";
Response.Status = "404 Not Found ";
Response.ContentDisposition = "";

Response.Cookies = function (name) {
    /// <summary>Cookies 集合用于设置或取得 cookie 的值。如果 cookie 不存，就创建它，并赋予它规定的值。</summary>
    /// <param name="name" type="string">必需。cookie 的名称。</param>
};


Response.Redirect = function (url) {
    /// <summary>Redirect 方法把用户重定向到一个不同的 URL 。</summary>
    /// <param name="name" type="string">必需。用户浏览器被重定向的 URL。</param>
};

Response.Write = function (text) {
    /// <summary>Write 方法向输出写一段指定的字符串。</summary>
    /// <param name="text" type="string">必需。要写的数据。</param>
};

Response.WriteFile = function (file) {
    /// <summary>WriteFile方法向输出写一个服务器文件</summary>
    /// <param name="file" type="string">必需。例如：/www/my.png</param>
    /// <returns type="bool">返回成功与否</returns>
};
Response.AppendToLog = function (logType, logEntry) {
    /// <summary>向服务器记录项目的添加日志字符串。</summary>
    /// <param name="logType" type="string">必需。日志类型。</param>
    /// <param name="logEntry" type="string">必需。日志内容。</param>
};

Response.BinaryWrite = function (data) {
    /// <summary>在没有任何字符转换的情况下直接向输出写数据。</summary>
    /// <param name="data" type="string">必需。被发送的二进制信息。</param>
};

Response.Clear = function () {
    /// <summary>清除已缓存的 HTML 输出。</summary>
};

Response.End = function () {
    /// <summary>停止处理脚本，并返回当前的结果。</summary>
};
/*************************************************************************
*
*			Server 对象的接口
*
**************************************************************************/
var Server = {};
Server.ScriptTimeout = 900;

Server.CreateObject = function (progID) {
    /// <summary>创建对象的实例（instance）。</summary>
    /// <param name="progID" type="string">必需。要创建的对象的类型。</param>
    /// <returns type="object">返回对象的实例</returns>
};

Server.Execute = function (path) {
    /// <summary>从另一个 TJS 文件中执行一个 TJS 文件。</summary>
    /// <param name="path" type="string">必需。要执行的 TJS 文件的位置。</param>
    /// <returns type="string">返回执行一个 TJS 文件的结果</returns>
};

Server.GetLastError = function () {
    /// <summary>返回可描述已发生错误状态信息。</summary>
};

Server.HTMLEncode = function (html) {
    /// <summary>将 HTML 编码应用到某个指定的字符串。</summary>
    /// <param name="html" type="string">必需。要编码的字符串。</param>
    /// <returns type="string">返回编码后的字符串。</returns>
};

Server.MapPath = function (path) {
    /// <summary>将一个指定的地址映射到一个物理地址。</summary>
    /// <param name="path" type="string">必需。URL地址。</param>
    /// <returns type="string">返回物理地址</returns>
};

Server.Transfer = function (path) {
    /// <summary>把一个 TJS 文件中创建的所有信息传输到另一个 TJS 文件。</summary>
    /// <param name="path" type="string">TJS 文件的位置。向这个 TJS 文件转移控制权。</param>
};

Server.URLEncode = function (url) {
    /// <summary>把 URL 编码规则应用到指定的字符串。</summary>
    /// <param name="url" type="string">必需。要编码的字符串。</param>
    /// <returns type="string">返回编码后的字符串。</returns>
};

Server.SplitWord = function (text) {
    /// <summary>把自然语言的中文分词成按“/”隔开的字符串。</summary>
    /// <param name="text" type="string">必需。要分词的字符串。</param>
    /// <returns type="string">返回分词后的字符串。</returns>
};

Server.WriteAuditLog = function (event,content,level) {
    /// <summary>把记录操作审计日志。</summary>
    /// <param name="event" type="string">必需，操作类型。</param>
    /// <param name="content" type="string">必需，操作内容。</param>
    /// <param name="level" type="number">必需，审计日志级别。</param>
};

/*************************************************************************
*
*			Session 对象的接口
*
**************************************************************************/
var Session = {};

Session.CodePage = 0;
Session.LCID = 0;
Session.SessionID = "";
Session.Timeout = 90;

Session.Contents = function (key) {
    /// <summary>Contents 集合包含着通过脚本命令添加到 application/session 的所有项目。</summary>
    /// <param name="key" type="string">必需。要取回的项目的名称。</param>
};

Session.StaticObjects = function (key) {
    /// <summary>StaticObjects 集合包含所有使用 HTML 的 <object> 标签追加到 application/session 的对象。</summary>
    /// <param name="key" type="string">必需。要取回的项目的名称。</param>
};

Session.Abandon = function () {
    /// <summary>撤销一个用户的 session。</summary>
};

Session.Remove = function (sessionID) {
    /// <summary>HA使用时，移除指定会话</summary>
    /// <param name="sessionID" type="string">必需。会话ID。</param>
};

Session.RemoveAll = function () {
    /// <summary>HA使用时，移除所有会话</summary>
};

var IOT = {};
IOT.Utils = function () {
    /// <summary>常用工具类操作。</summary>
};
IOT.Utils.isArray = function (object) {
    /// <summary>判断是否为数组对象。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isBoolean = function (object) {
    /// <summary>判断是否为布尔型。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isFunction = function (func) {
    /// <summary>判断是否为函数。</summary>
    /// <param name="func" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isNull = function (object) {
    /// <summary>判断是否为null。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isNumber = function (object) {
    /// <summary>判断是否为数字类型（number）。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isObject = function (object) {
    /// <summary>判断是否为对象（object）。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isString = function (object) {
    /// <summary>判断是否为字符串（string）。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.isUndefined = function (object) {
    /// <summary>判断是否未定义。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是或否</returns>
};
IOT.Utils.trim = function (str) {
    /// <summary>去除字符串里的空格。</summary>
    /// <param name="str" type="string">必需。要去除空格的字符串。</param>
    /// <returns type="string">返回去除空格后的字符串</returns>
};
IOT.Utils.isValue = function (object) {
    /// <summary>判断是否为合法的非空值。</summary>
    /// <param name="object" type="object">必需。要判断的对象。</param>
    /// <returns type="bool">返回是否合法，不合法false为null/undefined/NaN，合法true为其他值</returns>
};

IOT.Utils.isDigit = function (str) {
    /// <summary>判断是否全由数字组成。</summary>
    /// <param name="str" type="string">必需。要判断的对象。</param>
    /// <returns type="bool">返回是否全由数字组成</returns>
};

IOT.Utils.isPasswd = function (password) {
    /// <summary>校验密码复杂度是否大于6位，有字母、数字下划线组成。</summary>
    /// <param name="password" type="string">必需。要判断的密码。</param>
    /// <returns type="bool">返回是否符合</returns>
};
IOT.Utils.isTel = function (tel) {
    /// <summary>校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”。</summary>
    /// <param name="tel" type="string">必需。要校验的号码。</param>
    /// <returns type="bool">返回是否符合</returns>
};
IOT.Utils.isMobil = function (mob) {
    /// <summary>校验手机号码：必须以数字开头，除数字外，可含有“-”。 </summary>
    /// <param name="mob" type="string">必需。要校验的号码。</param>
    /// <returns type="bool">返回是否符合</returns>
};
IOT.Utils.isIntranet = function (ipaddr) {
    /// <summary>判断是否为局域网IP地址。 </summary>
    /// <param name="ipaddr" type="string">必需。要校验的IP地址。</param>
    /// <returns type="bool">返回是否为局域网IP</returns>
};
IOT.Utils.isIPAddr = function (ipaddr) {
    /// <summary>判断是否为合法的IP地址。 </summary>
    /// <param name="ipaddr" type="string">必需。要校验的IP地址。</param>
    /// <returns type="bool">返回是否合法</returns>
};
IOT.Utils.parseDate = function (str) {
    /// <summary>将日期字符串转换为日期类型。 </summary>
    /// <param name="str" type="string">必需。日期字符串。</param>
    /// <returns type="date">返回日期类型。</returns>
};
IOT.Utils.dateDiff = function (interval, startTime, endTime) {
    /// <summary>获取两个日期相差的时间（s：秒数，n：分钟，h：小时，d：天数，w：周数，m：月份，y：年）。 </summary>
    /// <param name="interval" type="string">必需。s：秒数，n：分钟，h：小时，d：天数，w：周数，m：月份，y：年。</param>
    /// <param name="startTime" type="date">必需。开始日期。</param>
    /// <param name="endTime" type="date">必需。结束日期。</param>
    /// <returns type="number">返回相差的时间。</returns>
};
IOT.Utils.dateMessage = function (str) {
    /// <summary>转换为日期的简短缩写。</summary>
    /// <param name="str" type="string">必需。要转换的日期。</param>
    /// <returns type="string">返回日期的简短缩写。</returns>
};
IOT.Utils.encode64 = function (input) {
    /// <summary>Base64编码。</summary>
    /// <param name="input" type="string">必需。要转换的编码。</param>
    /// <returns type="string">返回Base64编码。</returns>
};
IOT.Utils.formatNumber = function (num, pattern) {
    /// <summary>数字对象格式化。</summary>
    /// <param name="num" type="string">必需。要格式化的数字。</param>
    /// <param name="pattern" type="string">必需。格式化的样式，例如：#,###.00。</param>
    /// <returns type="string">返回格式化后的内容。</returns>
};

IOT.Utils.decode64 = function (input) {
    /// <summary>Base64解码。</summary>
    /// <param name="input" type="string">必需。要解码的文本。</param>
    /// <returns type="string">返回Base64编码。</returns>
};

IOT.Utils.parseBoolean = function (str) {
    /// <summary>布尔型转化。</summary>
    /// <param name="str" type="string">必需。需要转化的字符串，true:true,1,yes,y；false:false,0,no,n。</param>
    /// <returns type="bool">返回布尔型。</returns>
};

IOT.Utils.floatPrecision = function (num, pos) {
    /// <summary>精确浮点数精度。</summary>
    /// <param name="num" type="number">必需。需要格式化的数字。</param>
    /// <param name="pos" type="string">必需。保留几位小数。</param>
    /// <returns type="string">返回格式化后的数字。</returns>
};

IOT.Utils.getOpcPathLeft = function (strOPCFullName, leftNum) {
    /// <summary>从左边截去opc路径。</summary>
    /// <param name="strOPCFullName" type="string">必需。需要截取的OPC全路径。</param>
    /// <param name="leftNum" type="int">必需。截取位数。</param>
    /// <returns type="string">返回截断后的opc路径。</returns>
};
IOT.Utils.getOpcPathRight = function (strOPCFullName, rightNum) {
    /// <summary>从右边截去opc路径。</summary>
    /// <param name="strOPCFullName" type="string">必需。需要截取的OPC全路径。</param>
    /// <param name="rightNum" type="int">必需。截取位数。</param>
    /// <returns type="string">返回截断后的opc路径。</returns>
};
IOT.Utils.ExcuteAPI = function (method, url, data) {
    /// <summary>RESTful请求。</summary>
    /// <param name="method" type="string">必需。请求方式：get,post,put,delete。</param>
    /// <param name="url" type="string">必需。请求的URL。</param>
    /// <param name="data" type="string">可选。要传递的参数。</param>
    /// <returns type="string">返回请求结果。</returns>
};
IOT.Utils.signResource = function (method, url, user, pass) {
    /// <summary>TOS资源接口认证签名。</summary>
    /// <param name="method" type="string">必需。请求方式：get,post,put,delete。</param>
    /// <param name="url" type="string">必需。请求的URL。</param>
    /// <param name="user" type="string">必需。用户名。</param>
    /// <param name="pass" type="string">必需。密码。</param>
    /// <returns type="string">返回签名字符串。</returns>
};
IOT.Utils.pushCalendar = function (title, content, imagedata) {
    /// <summary>推送日历信息。</summary>
    /// <param name="title" type="string">必需。日历标题。</param>
    /// <param name="content" type="string">必需。日历内容。</param>
    /// <param name="imagedata" type="string">可选。关联图片（base64编码）。</param>
    /// <returns type="string">返回推送是否成功。</returns>
};
IOT.Utils.sendMessage = function (title, content, userid) {
    /// <summary>发送报警信息。</summary>
    /// <param name="title" type="string">必需。报警标题。</param>
    /// <param name="content" type="string">必需。报警内容。</param>
    /// <param name="userid" type="string">必需。报警推送联络人。</param>
    /// <returns type="string">返回发送报警是否成功。</returns>
};
IOT.Utils.sendWeiXin = function (template_tag, topcolor, urlstate, data, userid) {
    /// <summary>发送微信模板消息。</summary>
    /// <param name="template_tag" type="string">必需。微信模板标识。</param>
    /// <param name="topcolor" type="string">必需。消息推送标题的字体颜色。</param>
    /// <param name="urlstate" type="string">必需。	重定向后会带上state参数。</param>
    /// <param name="data" type="string">必需。模板消息内容数据。</param>
    /// <param name="userid" type="string">必需。平台用户id。</param>
    /// <returns type="string">返回发送微信消息是否成功。</returns>
};
IOT.Utils.xmlToJson = function (xmlString) {
    /// <summary>xml格式转换为json格式。</summary>
    /// <param name="xmlString" type="string">必需。xml字符串。</param>
    /// <returns type="string">返回json字符串。</returns>
};

IOT.Utils.wildcard=function(pattern,word){
		/// <summary> 通配符字符串比较。</summary>
		/// <param name="pattern" type="string">必需，样本*.gif</param>
		/// <param name="word" type="string">必需，比较内容。</param>
		/// <returns type="bool">返回字符串比较。</returns>
};

IOT.KVDB = function () {
    /// <summary>键值数据库操作库。</summary>
};
IOT.KVDB.Get = function (key) {
    /// <summary>按键值获取数据。</summary>
    /// <param name="key" type="string">必需。检索键值，可以是字符串、数字。</param>
    /// <returns type="string">返回检索数据。</returns>
};
IOT.KVDB.Set = function (key, value, bFinal) {
    /// <summary>写入KVDB数据库键值数据。</summary>
    /// <param name="key" type="string">必需。写入键值。</param>
    /// <param name="value" type="string">必需。写入数据。</param>
    /// <param name="bFinal" type="bool">必需。是否立刻提交。</param>
    /// <returns type="string">返回写入是否成功。</returns>
};
IOT.KVDB.Delete = function (key) {
    /// <summary>删除KVDB数据库对应键值及数据。</summary>
    /// <param name="key" type="string">必需。要删除的键值。</param>
    /// <returns type="string">返回删除是否成功。</returns>
};
IOT.KVDB.PkrGet = function (collectionName, startKey, endKey) {
    /// <summary>检索基于集合的键值数据。</summary>
    /// <param name="collectionName" type="string">必需。集合名称（相当于表）。</param>
    /// <param name="startKey" type="string">必需。检索起始键值。</param>
    /// <param name="endKey" type="string">必需。检索终止键值。</param>
    /// <returns type="string">返回检索结果。</returns>
};
IOT.KVDB.PkrSet = function (collectionName, key, value, bFinal) {
    /// <summary>向KVDB数据库的集合添加或更新键值数据对。</summary>
    /// <param name="collectionName" type="string">必需。集合名称（相当于表）。</param>
    /// <param name="key" type="string">必需。写入键值。</param>
    /// <param name="value" type="string">必需。写入数据。</param>
    /// <param name="bFinal" type="bool">必需。是否立刻提交。</param>
    /// <returns type="string">返回写入是否成功。</returns>
};
IOT.KVDB.PkrDelete = function (collectionName, key) {
    /// <summary>删除集合数据。</summary>
    /// <param name="collectionName" type="string">必需。集合名称（相当于表）。</param>
    /// <param name="key" type="string">必需。要删除键值。</param>
    /// <returns type="string">返回删除是否成功。</returns>
};

IOT.JSON = function () {
    /// <summary>JSON解析操作。</summary>
};
IOT.JSON.decode = function (str) {
	/// <summary>解析字符串转化为JSON对象。</summary>
	/// <param name="str" type="string">必需，JSON字符串文本。</param>
	/// <returns type="variable">返回JSON对象，失败返回null</returns>
};
IOT.JSON.encode = function (json) {
	/// <summary>编码JSON对象转化为字符串。</summary>
	/// <param name="json" type="variable">必需，JSON字符串文本。</param>
	/// <returns type="string">返回JSON字符串文本，失败返回null</returns>
};
IOT.SOAP = function () {
    /// <summary>SOAP协议辅助处理的方法。</summary>
};
IOT.SOAP.parseResquest = function (xml) {
    /// <summary>将请求的xml字符串解析为xml对象。</summary>
    /// <param name="xml" type="string">必需。xml字符串。</param>
    /// <returns type="object">返回xml对象</returns>
};
IOT.SOAP.getSoapMethod = function () {
    /// <summary>获取请求方式。</summary>
    /// <returns type="string">返回请求方式</returns>
};
IOT.SOAP.getSoapParameters = function (parameterName) {
    /// <summary>获取请求参数的值。</summary>
    /// <param name="parameterName" type="string">可选。请求参数名。</param>
    /// <returns type="string">返回请求参数值</returns>
};
IOT.SOAP.getSoapParamArr = function () {
    /// <summary>获取请求参数名的数组。</summary>
    /// <returns type="array">返回请求参数名的数组</returns>
};
IOT.SOAP.makeResponse = function (resultValue) {
    /// <summary>返回请求响应。</summary>
    /// <param name="resultValue" type="string">必需。响应内容。</param>
    /// <returns type="string">返回响应内容</returns>
};
IOT.ControlEngine = function () {
    /// <summary>控制状态机引擎。</summary>
};

IOT.ControlEngine.SetActionTask = function(config){
		/// <summary>设置控制状态机任务项，输入示例：{ActionRuleID:123456,ActionRuleName:"XXX",ActionWhat:"XXX",ActionWhere:"XXX",ActionStatus:1,ActionLevel:1,Extern:{ObjectID:1234,ObjectFullTag:"a.b.c",ObjectType:"Oragnize",UrlState:"message"}}</summary>
		/// <param name="ActionRuleID" type="number">必需，控制规则ID。</param>
		/// <param name="ActionRuleName" type="string">必需，控制规则名称。</param>
		/// <param name="ActionWhat" type="string">必需，控制描述。</param>
		/// <param name="ActionWhere" type="string">必需，控制来源或位置。</param>
		/// <param name="ActionStatus" type="number">必需，控制状态：1、等待中，2、运行中，3、暂停，4、失败，5、成功。</param>
		/// <param name="ActionLevel" type="number">必需，控制级别：1、普通级，2、优先级，3、紧急级，4、故障级，5、灾难级。</param>
		/// <param name="ObjectID" type="number">必需，控制对象内部ID。</param>
		/// <param name="ObjectFullTag" type="string">必需，控制对象完整标签。</param>
		/// <param name="ObjectType" type="string">必需，控制对象类型：Oragnize——组织对象、Group——设施对象、Node——设备对象。</param>
		/// <param name="UrlState" type="string">可选，控制URL链接功能号，由平台微应用中心定义。</param>
		/// <returns type="json">返回示例：{flag:false,id:123,info:""}</returns>
};

IOT.ControlEngine.GetActionTask = function(config){
		/// <summary>获取控制状态机任务项，输入示例：{ActionType:"Real",StartTime:"2017-02-01 08:00:00",EndTime:"2017-02-01 17:00:00"}</summary>
		/// <param name="ActionType" type="string">必需，控制数据类型：Real——实时控制一览，History——历史控制数据。</param>
		/// <param name="StartTime" type="string">必需，控制数据起始时间。</param>
		/// <param name="EndTime" type="string">必需，控制数据终止时间。</param>
		/// <returns type="json">返回示例：{flag:false,list:[],info:""}</returns>
};

IOT.ControlEngine.GetActionDetail = function(ActionRecordID){
		/// <summary>获取控制明细任务项</summary>
		/// <param name="ActionRecordID" type="number">必需，控制任务记录号。</param>
		/// <returns type="json">返回示例：{flag:false,list:[],info:""}</returns>
};

IOT.ControlEngine.StopActionTask = function(config){
		/// <summary>暂停控制任务项，输入示例：{ActionRecordID:123,ActionStopReason:"暂停原因..."}</summary>
		/// <param name="ActionRecordID" type="number">必需，控制任务记录号。</param>
		/// <param name="ActionStopReason" type="string">必需，为暂停原因描述。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.ControlEngine.RunActionTask = function(ActionRecordID){
		/// <summary>运行控制任务项</summary>
		/// <param name="ActionRecordID" type="number">必需，控制任务记录号。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};


IOT.ControlEngine.DeleteActionTask = function(ActionRecordID){
		/// <summary>删除控制任务项</summary>
		/// <param name="ActionRecordID" type="number">必需，控制任务记录号。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.ControlEngine.GetActionRule = function(){
		/// <summary>获取控制类型列表</summary>
    /// <returns type="json">返回示例：{flag:false,list:[],info:""}</returns>
};

IOT.ControlEngine.SetActionUser = function(config){
		/// <summary>添加监管人员列表，输入示例：{ToUser:[{UserID:"test1",UserName:"测试1"},{UserID:"test2",UserName:"测试2"}],ActionRule:[{RuleID:11,ActionLevel:1},{RuleID:22,ActionLevel:5}],ActionWeek:[0,1,1,1,1,1,0],StartTime:"08:00:00",EndTime:"17:00:00"}</summary>
		/// <param name="ToUser" type="array">必需，监管人员。</param>
		/// <param name="ActionRuleID" type="number">必需，控制项列表。</param>
		/// <param name="ActionWeek" type="array">必需，周日到周六的控制使能。</param>
		/// <param name="StartTime" type="string">必需，每日控制允许通知时间。</param>
		/// <param name="EndTime" type="string">必需，每日控制允许通知时间。</param>
    /// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.ControlEngine.GetActionUser = function(){
		/// <summary>获取监管通知人员列表</summary>
		/// <returns type="json">返回示例：{flag:false,list:[],info:""}</returns>
};

IOT.ControlEngine.DelActionUser = function(UserID){
		/// <summary>删除监管通知人员</summary>
		/// <param name="UserID" type="string">必需，监管人员UserID。</param>
    /// <returns type="json">返回示例：{flag:false,info:""}</returns>
};


IOT.AlarmEngine = function () {
    /// <summary>报警状态机引擎。</summary>
};


IOT.AlarmEngine.SetAlarmData = function(config){
		/// <summary>设置报警项，输入示例：{AlarmRuleID:123456,AlarmRuleName:"XXX",AlarmWhat:"XXX",AlarmWhere:"XXX",AlarmLevel:1,Extern:{ObjectID:1234,ObjectFullTag:"a.b.c",ObjectType:"Oragnize",UrlState:"message"}}</summary>
		/// <param name="AlarmRuleID" type="number">必需，报警规则ID。</param>
		/// <param name="AlarmRuleName" type="string">必需，报警规则名称。</param>
		/// <param name="AlarmWhat" type="string">必需，报警描述。</param>
		/// <param name="AlarmWhere" type="string">必需，报警来源或位置。</param>
		/// <param name="AlarmLevel" type="number">必需，报警级别：1、一般信息，2、告警，3、紧急，4、危险，5、正常。</param>
		/// <param name="ObjectID" type="number">必需，报警对象内部ID。</param>
		/// <param name="ObjectFullTag" type="string">必需，报警对象完整标签。</param>
		/// <param name="ObjectType" type="string">必需，报警对象类型：Oragnize——组织对象、Group——设施对象、Node——设备对象。</param>
		/// <param name="UrlState" type="string">必需，报警URL链接功能号，由平台微应用中心定义。</param>
		/// <returns type="json">返回示例：{flag:false,id:123,info:""}，其中id为报警记录ID</returns>
};

IOT.AlarmEngine.GetAlarmData = function(config){
		/// <summary>获取报警项，输入示例：{AlarmType:"Real",StartTime:"2017-02-01 08:00:00",EndTime:"2017-02-01 17:00:00"}</summary>
		/// <param name="AlarmType" type="string">必需，报警数据类型：Real——实时报警一览，History——历史报警数据。</param>
		/// <param name="StartTime" type="string">必需，报警数据起始时间。</param>
		/// <param name="EndTime" type="string">必需，报警数据终止时间。</param>
		/// <returns type="json">返回示例：{flag:false,list:[],info:""}</returns>
};

IOT.AlarmEngine.GetAlarmDetail = function(AlarmRecordID){
		/// <summary>获取报警明细</summary>
		/// <param name="AlarmRecordID" type="number">必需，报警数据记录号。</param>
		/// <returns type="json">返回示例：{flag:false,list:[],info:""}</returns>
};

IOT.AlarmEngine.CancelAlarmData = function(config){
		/// <summary>消除报警项，输入示例：{AlarmRecordID:123,CancelTimeOut:300,AlarmCancelReason:"消警原因..."}</summary>
		/// <param name="AlarmRecordID" type="number">必需，报警数据记录号。</param>
		/// <param name="CancelTimeOut" type="number">必需，消警时长，期间不报警。</param>
		/// <param name="AlarmCancelReason" type="string">必需，消警原因描述。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.AlarmEngine.RestoreAlarmData = function(AlarmRecordID){
		/// <summary>恢复报警项</summary>
		/// <param name="AlarmRecordID" type="number">必需，报警数据记录号。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.AlarmEngine.DeleteAlarmData = function(AlarmRecordID){
		/// <summary>删除报警项</summary>
		/// <param name="AlarmRecordID" type="number">必需，报警数据记录号。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.AlarmEngine.GetAlarmRule = function(){
		/// <summary>获取报警类型列表</summary>
		/// <returns type="json">返回示例：{flag:false,list:[]，info:""}</returns>
};

IOT.AlarmEngine.SetAlarmUser = function(config){
		/// <summary>添加接警人员，输入示例：{ToUser:[{UserID:"test1",UserName:"测试1"},{UserID:"test2",UserName:"测试2"}],AlarmRule:[{RuleID:11,AlarmLevel:1},{RuleID:22,AlarmLevel:5}],AlarmWeek:[0,1,1,1,1,1,0],StartTime:"08:00:00",EndTime:"17:00:00"}</summary>
		/// <param name="ToUser" type="array">必需，接警人员列表。</param>
		/// <param name="AlarmRuleID" type="array">必需，报警项列表。</param>
		/// <param name="AlarmWeek" type="array">必需，周日到周六的报警使能。</param>
		/// <param name="StartTime" type="string">必需，每日报警允许通知时间。</param>
		/// <param name="EndTime" type="string">必需，每日报警允许通知时间。</param>
		/// <returns type="json">返回示例：{flag:false,info:""}</returns>
};

IOT.AlarmEngine.GetAlarmUser = function(){
		/// <summary>获取接警人员列表</summary>
		/// <returns type="json">返回示例： {flag:false,list:[],info:""}</returns>
};

IOT.AlarmEngine.DelAlarmUser = function(UserID){
		/// <summary>删除接警人员</summary>
		/// <param name="UserID" type="number">必需，报警人员账号。</param>
		/// <returns type="json">返回示例： {flag:false,info:""}</returns>
};


IOT.RDC = function () {
    /// <summary>关系数据库的各类操作。</summary>
};
IOT.RDC.ExecuteSQL = function (sql, dbname) {
    /// <summary>执行关系数据库sql语句。</summary>
    /// <param name="sql" type="string">必需。要执行的sql语句。</param>
    /// <param name="dbname" type="string">可选。要执行的数据库名称，默认为当前数据库。</param>
    /// <returns type="json">返回执行结果</returns>
};
IOT.RDC.GetDataTableField = function (table, dbname) {
    /// <summary>获取数据表的字段。</summary>
    /// <param name="table" type="string">必需。数据库的表名称。</param>
    /// <param name="dbname" type="string">可选。要执行的数据库名称，默认为当前数据库，可不传此参数。</param>
    /// <returns type="json">返回数据表相应的字段</returns>
};
IOT.RDC.GetDataBaseTable = function (dbname) {
    /// <summary>获取数据库所有的数据表。</summary>
    /// <param name="dbname" type="string">可选。要执行的数据库名称，默认为当前数据库，可不传此参数。</param>
    /// <returns type="json">返回数据库所有的数据表</returns>
};
IOT.RDC.GetDataBaseList = function () {
    /// <summary>获取所有的关系型数据库。</summary>
    /// <returns type="json">返回所有的数据库</returns>
};

IOT.Task = function () {
    /// <summary>任务的各类操作。</summary>
};

IOT.Task.Get = function (taskid) {
    /// <summary>所有计划任务信息。</summary>
    /// <param name="taskid" type="int">可选。计划任务的ID。</param>
    /// <returns type="json">返回所有计划任务信息或指定任务ID信息</returns>
};
IOT.Task.Run = function (taskid) {
    /// <summary>执行指定计划任务。</summary>
    /// <param name="taskid" type="int">必需。计划任务的ID。</param>
    /// <returns type="json">返回执行是否成功</returns>
};
IOT.Task.Remove = function (taskid) {
    /// <summary>删除指定计划任务。</summary>
    /// <param name="taskid" type="int">必需。计划任务的ID。</param>
    /// <returns type="json">返回删除是否成功</returns>
};
IOT.Task.Execute = function (task,bExecute) {
    /// <summary>模拟执行后台脚本任务。</summary>
    /// <param name="task" type="json">必需。method：提交方式post、get、put、delete；url：执行脚本路径，data：提交数据。注：异步任务只支持get</param>
    /// <param name="bExecute" type="bool">可选。是否立即递交执行，不传参数时，代表同步执行任务。</param>
    /// <returns type="json">返回执行结果</returns>
};
IOT.Task.Push = function (task) {
    /// <summary>添加临时任务。任务脚本执行时，IOT会通过QueryString传递TagType、TagPath、TagValue三个参数给执行任务脚本</summary>
    /// <param name="task" type="json">必需。name：任务名称，runPath：执行任务的脚本路径，tagType：要传入脚本的对象属性的类型，默认有Oragnize、Group、Node，tagPath：实体对象的标签路径,tagValue：实体对象的值，timeOut：执行延时时间</param>
    /// <returns type="json">返回添加结果</returns>
};

IOT.System= function () {
    /// <summary>系统对象操作库。</summary>
};

IOT.System.GroupObject = function () {
    /// <summary>设施模型操作库。</summary>
};

IOT.System.GroupObject.Add = function (item) {
    /// <summary>添加设施分组。</summary>
    /// <param name="item" type="json">必需。设施分组的配置信息。{parentFullTag:"父节点全路径标签",name:"分组名称",tag:"分组标签"}，除parentFullTag外，均不能为空。</param>
    /// <returns type="json">添加成功,返回设施信息，添加失败，返回0</returns>
};
IOT.System.GroupObject.Delete = function (fullTag) {
    /// <summary>删除设施分组。</summary>
    /// <param name="fullTag" type="string">必需。设施分组的全路径标签。</param>
    /// <returns type="json">返回删除是否成功</returns>
};
IOT.System.GroupObject.Get = function (fullTag,type) {
    /// <summary>指定设施分组的设备树、子节点信息。</summary>
    /// <param name="fullTag" type="string">必需。设施分组的全路径标签。</param>
    /// <param name="type" type="string">必需。type:tree,flat,list,the,self</param>
    /// <returns type="json">返回结果集，tree：树节点，flat：该分组下的所有设备节点，list：所有设施分组（或通过全路径筛选），the：计量关系下的所有设备节点，self：自身节点信息。</returns>
};
IOT.System.GroupObject.Set = function (item, bApplyFlag) {
    /// <summary>设定设施分组的属性信息。</summary>
    /// <param name="item" type="json">{fullTag:设施全路径,key:要设置的项,value:设置的值}。</param>
    /// <param name="bApplyFlag" type="bool">可选。默认值为true，是否立即生效，默认为true，批量修改时，最后一笔设置生效。</param>
    /// <returns type="json">返回设置是否成功，以及设施分组的最新信息。</returns>
};

IOT.System.OrganizeObject = function () {
    /// <summary>组织机构操作库。</summary>
};

IOT.System.OrganizeObject.Add = function (item) {
    /// <summary>添加组织机构。</summary>
    /// <param name="item" type="json">必需。组织机构的配置信息。{parentFullTag:"父节点全路径标签",name:"分组名称",tag:"分组标签"}除parentFullTag外，均不能为空。</param>
    /// <returns type="json">添加成功,返回组织机构信息，添加失败，返回0</returns>
};
IOT.System.OrganizeObject.Delete = function (fullTag) {
    /// <summary>删除组织机构。</summary>
    /// <param name="fullTag" type="string">必需。组织机构的全路径标签。</param>
    /// <returns type="json">返回删除是否成功</returns>
};
IOT.System.OrganizeObject.Get = function (fullTag, type) {
    /// <summary>指定组织机构的设备树、子节点信息。</summary>
    /// <param name="fullTag" type="string">必需。组织机构的全路径标签。</param>
    /// <param name="type" type="string">必需。type:tree,flat,list,the,self</param>
    /// <returns type="json">返回结果集，tree：树节点，flat：该组织机构下的所有组织机构，list：所有组织机构（或通过全路径筛选），the：计量关系下的所有设备节点，self：自身节点信息。</returns>
};
IOT.System.OrganizeObject.Set = function (item, bApplyFlag) {
    /// <summary>设定组织机构的属性信息。</summary>
    /// <param name="item" type="json">{fullTag:设施全路径,key:要设置的项,value:设置的值}。</param>
    /// <param name="bApplyFlag" type="bool">可选。默认值为true，是否立即生效，默认为true，批量修改时，最后一笔设置生效。</param>
    /// <returns type="json">返回设置是否成功，以及组织机构的最新信息。</returns>
};

IOT.System.NodeObject = function () {
    /// <summary>设备操作库。</summary>
};

IOT.System.NodeObject.Add = function (item) {
    /// <summary>添加设备。</summary>
    /// <param name="item" type="json">必需。设备的配置信息。{parentFullTag:"父节点全路径标签",name:"设备名称",tag:"设备标签",dtuNo:"网关或网由编号",typeName:"设备模板名称",stNo:"设备模板名称"}除parentFullTag外，均不能为空。</param>
    /// <returns type="json">添加成功,返回设备信息，添加失败，返回0</returns>
};
IOT.System.NodeObject.Delete = function (fullTag) {
    /// <summary>删除设备。</summary>
    /// <param name="fullTag" type="string">必需。设备的全路径标签。</param>
    /// <returns type="json">返回删除是否成功</returns>
};
IOT.System.NodeObject.Get = function (fullTag, type,valueTag) {
    /// <summary>指定设备或子节点信息。</summary>
    /// <param name="fullTag" type="string">可选。设备的全路径标签。</param>
    /// <param name="type" type="string">必需。type:list,the,self</param>
    /// <param name="valueTag" type="string">可选。type为list时使用，可筛选指定设备变量，如果为空，则不返回设备信息。</param>
    /// <returns type="json">返回结果集，list：所有设备（或通过全路径筛选），the：计量关系下的所有设备节点，self：自身节点信息。</returns>
};
IOT.System.NodeObject.Set = function (item, bApplyFlag) {
    /// <summary>设定设备的属性信息。</summary>
    /// <param name="item" type="json">{fullTag:设施全路径,key:要设置的项,value:设置的值}。</param>
    /// <param name="bApplyFlag" type="bool">可选。默认值为true，是否立即生效，默认为true，批量修改时，最后一笔设置生效。</param>
    /// <returns type="json">返回设置是否成功，以及设备的最新信息。</returns>
};

IOT.System.NodeObject.WriteValue = function (fullValueTag, dataValue, bApply) {
    /// <summary>批量或单个写入设备变量。</summary>
    /// <param name="fullValueTag" type="string">必需，设备变量全路径。</param>
    /// <param name="dataValue" type="float">必需，写入值。</param>
    /// <param name="bApply" type="bool">可选，是否立即生效。</param>
    /// <returns type="json">返回写入是否成功。</returns>
};

IOT.System.NodeObject.WriteValueWithTime = function (fullValueTag, dataValue, dateTime, bApply) {
    /// <summary>带时间戳的批量或单个写入设备变量。</summary>
    /// <param name="fullValueTag" type="string">必需，设备变量全路径。</param>
    /// <param name="dataValue" type="float">必需，写入值。</param>
    /// <param name="dateTime" type="string">必需，写入时间。</param>
    /// <param name="bApply" type="bool">可选，是否立即生效。</param>
    /// <returns type="json">返回写入是否成功。</returns>
};

IOT.System.NodeObject.ReadValue = function (fullValueTag) {
    /// <summary>读取设备的实时变量数据。</summary>
    /// <param name="fullValueTag" type="json">设备变量全路径。</param>
    /// <returns type="json">返回变量数据。</returns>
};

IOT.System.NodeObject.ReadValueTime = function (fullValueTag) {
    /// <summary>读取设备的实时变量数据时间。</summary>
    /// <param name="fullValueTag" type="json">设备变量全路径。</param>
    /// <returns type="json">返回数据时间。</returns>
};

IOT.System.NodeObject.HistoryData = function (fullTag, startTime, endTime, valueTag) {
    /// <summary>读取设备变量的历史数据。</summary>
    /// <param name="fullTag" type="string">必需，设备全路径。</param>
    /// <param name="startTime" type="string">必需，开始时间。</param>
    /// <param name="endTime" type="string">必需，结束时间。</param>
    /// <param name="valueTag" type="string">可选，具体某个变量。</param>
    /// <returns type="json">返回历史数据。</returns>
};

IOT.System.NodeObject.AlarmData = function (fullTag, startTime, endTime) {
    /// <summary>读取设备的报警数据。</summary>
    /// <param name="fullTag" type="string">必需，设备全路径。</param>
    /// <param name="startTime" type="string">必需，开始时间。</param>
    /// <param name="endTime" type="string">必需，结束时间。</param>
    /// <returns type="json">返回报警数据。</returns>
};

IOT.System.NodeObject.Refresh = function (fullTag) {
    /// <summary>立即对设备的发送即抄命令。</summary>
    /// <param name="fullTag" type="string">必需，设备全路径。</param>
    /// <returns type="json">返回即抄命令执行结果。</returns>
};

IOT.System.ObjectClass = function () {
    /// <summary>对象操作库。</summary>
};

IOT.System.ObjectClass.GetNodeByClass = function (tag,withValue) {
    /// <summary>获取智能对象及实例。</summary>
    /// <param name="tag" type="string">可选，智能对象标签。</param>
    /// <param name="withValue" type="string">可选，智能对象变量。</param>
    /// <returns type="json">返回智能对象。</returns>
};

IOT.System.ObjectClass.GetGroupByClass = function (tag) {
    /// <summary>获取设施对象及实例。</summary>
    /// <param name="tag" type="string">可选，设施对象标签。</param>
    /// <returns type="json">返回设施对象。</returns>
};

IOT.System.ObjectClass.GetOrganizeByClass = function (tag) {
    /// <summary>获取管理对象及实例。</summary>
    /// <param name="tag" type="string">可选，管理对象标签。</param>
    /// <returns type="json">返回管理对象。</returns>
};


IOT.Media = function () {
    /// <summary>数字媒体操作库。</summary>
};
IOT.Media.Image = function () {
    /// <summary>图像处理操作库。</summary>
}
IOT.Media.Image.CreateImagePathThumbs = function (image) {
    /// <summary>生成图形缩略图文件夹。</summary>
    /// <param name="image" type="json">必需，image.source：图像路径,image.width：宽度。</param>
    /// <returns type="json">返回文件夹创建是否成功。</returns>
};
IOT.Media.Image.CreateImageFileThumbs = function (image) {
    /// <summary>生成图形文件的缩略图。</summary>
    /// <param name="image" type="json">必需，image.source：图像原路径,image.target：生成目标路径,image.width：宽度，image.height：高度。</param>
    /// <returns type="json">返回图像创建是否成功。</returns>
};
IOT.Media.Image.CreateImageBase64 = function (image) {
    /// <summary>通过Base64生成图形文件。</summary>
    /// <param name="image" type="json">必需，image.target：生成目标路径,image.base64：文本。</param>
    /// <returns type="json">返回图像创建是否成功。</returns>
};
IOT.Media.Image.GetImageBase64 = function (source) {
    /// <summary>获取图形文件Base64文本。</summary>
    /// <param name="image" type="json">必需，指定图片文件或图片数据流。</param>
    /// <returns type="json">返回图像文件转换Base64。</returns>
};
IOT.Media.Image.GetImageSize = function (source) {
    /// <summary>获取图像文件的信息。</summary>
    /// <param name="source" type="string">必需，图像原路径。</param>
    /// <returns type="json">返回图像文件信息。</returns>
};

IOT.Media.Video = function () {
    /// <summary>视频处理操作库。</summary>
}
IOT.Media.Video.GetVideoList = function () {
    /// <summary>获取视频列表。</summary>
    /// <returns type="json">返回视频列表。</returns>
};
IOT.Media.Video.GetVideoPicture = function (videoID) {
    /// <summary>获取视频截图，直接返回图片数据流。</summary>
    /// <param name="videoID" type="int">必需，指定视频ID。</param>
    /// <returns type="json">返回图片数据流。</returns>
};
IOT.Media.Video.SetText = function (videoID, text) {
    /// <summary>设置指定视频的字幕信息。</summary>
    /// <param name="videoID" type="int">必需，指定视频ID。</param>
    /// <param name="text" type="string">必需，文字内容。</param>
    /// <returns type="json">返回设置是否成功。</returns>
};
IOT.Media.Video.CaptureVideo = function (videoID, saveFileName) {
    /// <summary>对指定视频进行截屏操作，并保存图像文件。</summary>
    /// <param name="videoID" type="int">必需，指定视频ID。</param>
    /// <param name="saveFileName" type="string">必需，保存文件名。</param>
    /// <returns type="json">返回截屏是否成功。</returns>
};
IOT.Media.Video.StartRecord = function (videoID, userTag, saveFileName) {
    /// <summary>开始视频录像。</summary>
    /// <param name="videoID" type="int">必需，指定视频ID。</param>
    /// <param name="userTag" type="string">必需，用户自定义视频文件标签。</param>
    /// <param name="saveFileName" type="string">必需，保存文件名。</param>
    /// <returns type="json">返回开始录像是否成功。</returns>
};
IOT.Media.Video.StopRecord = function (videoID, userTag) {
    /// <summary>停止视频录像。</summary>
    /// <param name="videoID" type="int">必需，指定视频ID。</param>
    /// <param name="userTag" type="string">必需，用户自定义视频文件标签。</param>
    /// <returns type="json">返回停止录像是否成功。</returns>
};
IOT.Storage = function () {
    /// <summary>文件操作库。</summary>
}

IOT.Storage.WriteFile = function (fileDir, content, isUtf8) {
    /// <summary>写文件操作。</summary>
    /// <param name="fileDir" type="string">必需，要写入的文件路径（绝对路径或相对路径）。</param>
    /// <param name="content" type="string">必需，写入文件的内容。</param>
    /// <param name="isUtf8" type="bool">可选，是否UTF8编码。</param>
    /// <returns type="json">返回写入文件是否成功。</returns>
};
IOT.Storage.ReadFile = function (fileDir, isUtf8) {
    /// <summary>读取文件操作。</summary>
    /// <param name="fileDir" type="string">必需，要读取的文件路径（绝对路径或相对路径）。</param>
    /// <param name="isUtf8" type="bool">可选，是否UTF8编码。</param>
    /// <returns type="json">返回读取文件的内容。</returns>
};
IOT.Storage.CheckFileIsExist = function (fileDir) {
    /// <summary>检查文件是否存在。</summary>
    /// <param name="fileDir" type="string">必需，要检查的文件路径（绝对路径或相对路径）。</param>
    /// <returns type="json">返回文件是否存在。</returns>
};
IOT.Storage.DeleteFloder = function (currentDir) {
    /// <summary>删除文件目录。</summary>
    /// <param name="currentDir" type="string">必需，要删除的文件目录（绝对路径或相对路径）。</param>
    /// <returns type="json">返回删除文件目录是否成功。</returns>
};
IOT.Storage.DeleteFile = function (fileDir) {
    /// <summary>删除文件。</summary>
    /// <param name="fileDir" type="string">必需，要删除的文件路径（绝对路径或相对路径）。</param>
    /// <returns type="json">返回删除文件是否成功。</returns>
};
IOT.Storage.CreateFloder = function (currentDir) {
    /// <summary>创建文件目录。</summary>
    /// <param name="currentDir" type="string">必需，要创建的文件目录路径（绝对路径或相对路径）。</param>
    /// <returns type="json">返回创建文件目录是否成功。</returns>
};
IOT.Storage.UploadFile = function (attendPath, attendName, varChunk, nChunkIndex) {
    /// <summary>上传文件。</summary>
    /// <param name="attendPath" type="string">必需，要上传的文件路径（绝对路径或相对路径）。</param>
    /// <param name="attendName" type="string">必需，要上传的文件名。</param>
    /// <param name="varChunk" type="blob">必需，二进制文件流。</param>
    /// <param name="nChunkIndex" type="int">必需，断点续传的包号。</param>
    /// <returns type="json">返回上传文件是否成功。</returns>
};
IOT.Storage.UnzipFile = function (dstPath, srcFile) {
    /// <summary>解压缩文件。</summary>
    /// <param name="dstPath" type="string">必需，要解压缩的文件路径（绝对路径或相对路径）。</param>
    /// <param name="srcFile" type="string">必需，解压缩后的文件名。</param>
    /// <returns type="json">返回解压缩文件是否成功。</returns>
};
IOT.Storage.ListFloder = function (currentDir, filter) {
    /// <summary>获取文件列表。</summary>
    /// <param name="currentDir" type="string">必需，文件夹路径（绝对路径或相对路径）。</param>
    /// <param name="filter" type="string">必需，要过滤的文件类型。</param>
    /// <returns type="json">返回获取文件列表。</returns>
};

IOT.Socket = function () {
    /// <summary>网络操作方法库。</summary>

}

IOT.Socket.Connect = function (item) {
    /// <summary>创建Socket通讯连接。</summary>
    /// <param name="item" type="json">{ipaddr:目标IP地址,port:目标通讯端口,tcpflag:是否采用TCP协议(0:不启用,1:启用)}。</param>
    /// <returns type="json">返回连接是否成功。</returns>
}

IOT.Socket.Close = function () {
    /// <summary>关闭Socket通讯连接。</summary>
    /// <returns type="json">关闭Socket通讯连接成功或失败。</returns>
}

IOT.Socket.ReadSocketText = function (timeout) {
    /// <summary>接收Socket通讯数据。(仅支持文本)</summary>
    /// <param name="timeout" type="int">timeout 接收Socket通讯数据超时，单位为秒</param>
    /// <returns type="json">返回接收的Socket通讯数据。</returns>
}

IOT.Socket.SendSocketText = function (text) {
    /// <summary>发送Socket通讯数据。(仅支持文本)</summary>
    /// <param name="text" type="text">发送的数据。</param>
    /// <returns type="json">发送Socket通讯成功或失败。</returns>
}

IOT.Security = function () {
    /// <summary>安全加密方法库。</summary>

}

IOT.Security.Computer = function (item) {
    /// <summary>数据加密。</summary>
    /// <param name="item" type="json">{type:加密类型(CRC16,CRC32,FCS16,FCS32,MD2,MD4,MD5,SHA1,SHA256,SHA384,SHA512),data:待加密的数据,hexflag:否为十六进制字符串}。</param>
    /// <returns type="json">返回加密后的数据。</returns>
}

IOT.Project = function () {
    /// <summary>应用工程操作方法库。</summary>
}

IOT.Project.ProjectID = 0;
IOT.Project.ProjectName="";
IOT.Project.ProjectPath="";
IOT.Project.AuthNodeNum=0;
IOT.Project.UserNodeNum=0;
IOT.Project.CPU=0;
IOT.Project.UserMem=0;
IOT.Project.TotalMem=0;
IOT.Project.DiskUsageSpace=0;
IOT.Project.DiskTotalSpace=0;
IOT.Project.OnlineGate=0;
IOT.Project.OfflineGate=0;
IOT.Project.OnlineNode=0;
IOT.Project.OfflineNode=0;
IOT.Project.OnlineUser=0;
IOT.Project.UserName="";
IOT.Project.FullName="";
IOT.Project.EMail="";
IOT.Project.PhoneNum="";
IOT.Project.AuthRand=0;
IOT.Project.UserInfo="";
IOT.Project.AuthInfo="";
IOT.Project.LoginIPAddr="";
IOT.Project.LoginTime="";
IOT.Project.SSOUrl="";

IOT.Project.SystemStatus = function () {
	/// <summary>获取当前系统运行信息</summary>
	/// <returns type="json">返回运行信息</returns>
}

IOT.Project.UserStatus = function () {
	/// <summary>获取当前登录用户信息</summary>
	/// <returns type="json">返回用户信息</returns>
}


IOT.Project.DebugPrint = function (content) {
	/// <summary>打印程序运行调试信息</summary>
	/// <param name="content" type="string">必需，需要打印的调试信息。</param>
}


IOT.Project.GetFunctionList = function () {
	/// <summary>获取当前用户功能授权信息</summary>
	/// <returns type="json">返回功能列表信息</returns>
}

IOT.Project.CloudSetupInfo = function () {
	/// <summary>获取云端同步信息</summary>
	/// <returns type="json">返回云端同步信息</returns>
}


