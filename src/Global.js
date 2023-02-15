

exports.install = function (Vue) {
<<<<<<< HEAD
  Vue.prototype.$target="http://106.52.150.170:8080"
  // Vue.prototype.$target="http://106.52.150.170:8080/"
=======
  Vue.prototype.$target="http://106.52.150.170:8080/"
>>>>>>> 4233de7afe8b2e3541c4ae62bad3dfc4f8df99ca
  // 封装提示成功的弹出框
  Vue.prototype.notifySucceed = function (msg) {
    this.$notify({
      title: "成功",
      message: msg,
      type: "success",
      offset: 100
    });
  };
  // 封装提示失败的弹出框
  Vue.prototype.notifyError = function (msg) {
    this.$notify.error({
      title: "错误",
      message: msg,
      offset: 100
    });
  };
}