(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-088d727e"],{"0bce":function(e,s,t){},"73db":function(e,s,t){"use strict";t.r(s);var n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"flex flex-column"},[e.parsing||e.users?e._e():t("div",{staticClass:"flex flex-column"},[t("input",{staticClass:"p2 m1 h3 flex-auto",attrs:{type:"text",placeholder:"Campaign Name",autofocus:""},domProps:{value:e.campaignName}}),t("input",{ref:"file",staticClass:"m1 h4",attrs:{type:"file",accept:"text/csv"}}),t("div",[t("div",{staticClass:"button py1 px2 m1",on:{click:e.processFile}},[e._v("\n        next\n      ")])])]),e.parsing?t("div",[e._v("pretend this is a loading spinner")]):e._e(),!e.parsing&&e.users?t("div",{staticClass:"m1"},[e._v("\n    Preview of user data:\n    "),t("pre",[e._v(e._s(e.users))]),t("div",[t("div",{staticClass:"button btn-success py1 px2 m1",on:{click:e.commitNewCampaign}},[e._v("\n        My data looks good\n      ")]),t("div",{staticClass:"button py1 px2 m1"},[e._v("\n        I need to change something\n      ")])])]):e._e()])},a=[],i=(t("96cf"),t("3040")),c=(t("cadf"),t("551c"),t("097d"),t("e196"),{data:function(){return{campaignName:"",users:null,parsing:!1,pushing:!1,stage:0}},methods:{processFile:function(){var e=this,s=this.$refs.file.files[0];console.log(s),this.users=this.$store.dispatch("parse",{file:s}).then(function(s){e.parsing=!1,e.users=s}),this.parsing=!0},commitNewCampaign:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.pushing=!0,console.log(this),e.next=4,this.$store.dispatch("newCampaign",{users:this.users,name:this.campaignName});case 4:s=e.sent,this.$router.push("/campaigns/".concat(s,"/edit"));case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}}),r=c,o=(t("d32a"),t("2877")),u=Object(o["a"])(r,n,a,!1,null,null,null);u.options.__file="NewCampaign.vue";s["default"]=u.exports},d32a:function(e,s,t){"use strict";var n=t("0bce"),a=t.n(n);a.a}}]);
//# sourceMappingURL=chunk-088d727e.b5198217.js.map