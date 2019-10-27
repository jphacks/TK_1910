<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-3">
    <md-result-page
      class="customized"
      img-url="https://popcorn-images-aws.s3.ap-northeast-1.amazonaws.com/popcorn_white.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAP7bzYB6EKaj3lL2uXVY3L9Fm02TBAGkiuqPjwLBXs0tAiBICC%2FlZ8admwdiMXKKCO6abxObOcMYlXRvNhhEKvncQSqAAghtEAAaDDQ3MDU0NTA3NDcxMyIMtL7c5G9PtVg1OEggKt0Bruc2H5iiInhA1mJbWA7c6ElpXjrQAVz6rViC73euaw2AIsHxm17MtXsjxp1coeDsbbJ9hex9ZdWxMA320kVnpCppKTSPWKAsYcsddUThJAPiWXigTIP6ksLGZVrBjAqQUv5L%2B0rblpDQuW8jTptuxZXOw4re%2B6b4cWLAPGZvX9uTzW%2FJZv3AbL2YecHkI93bxLceFUUSZ%2F%2FXrOGOUGh7B0rWdnHB6AKpITqnOOIa88UAYBwwjQGsEnIUyNiLfn33TlZ%2FmEXQIpD%2BrcVKOTzGauP9LG506AdFLHykAIgwnKnU7QU6jwOyySRFDCZg%2Bst9XnBGstWgzvHeW9Q3PXdKf55oeDixp5QBV5%2BYKZVxsQAdSqMOYphfbyQX5obrV3WnOUyNVJaqxHdT7wgcDpaCYEhhfu5MiKnTXS%2FQynfvkZgZBps1H1VifjdMCsUjaPAaLSimeSx7ssq%2B3pzqiuF%2B62RTUx3SlBXNcY2IhI%2Bl02dJQunljINv0neeUq44FGmqkBPo7KdFweecbSzxr5PRy9OExQPeD3PAQfa7egOCjhYWnN0w1ljowWyD3NVL8lsPoTJpxejrzgSyDXfkFt307pw7IXcR3%2BP8o%2FlWF%2F6%2BDqHvLrRmC5%2FRv4gW1xqwqcX6Kl%2B54pEopPzBgm6eXgLShBZScI3RKiGqveEjr8pckxdCna88QmfLelfA6Y%2BxuEcYvvv2igiwc7eacwoIu0BPIGAGJRQLgBEuIlV4nRbCIWvPCdZMgFiXO4t5u5WZ5DZdIqdWXdqvMi3l5SZgrXxYrJ7gfww94qBgowOAm5BCG9xP8ktHJJLxaVkbFserKze4koAbPhA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20191027T035410Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAW3DVMBIM2VCPOBOB%2F20191027%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Signature=10bc8fc9b78a648072ef37c9f78f748b31eee5a0ec53ac7796d1c1318a94b2c4"
      text="支払完了"
      subtext="しばらくお待ちください"
    >
      <span></span>
    </md-result-page>
    <span></span>
  </div>
</template>

<script>
import { ResultPage } from "mand-mobile";

export default {
  name: "result-page-demo",
  components: {
    [ResultPage.name]: ResultPage
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$http
        .get("/server/order/payment/" + this.id)
        .then(res => {
          this.data = res.data;
        })
        .catch(error => {
          if (error.response.data.message) {
            Dialog.alert({
              title: "エラー",
              content: error.response.data.message,
              confirmText: "はい"
            });
          }
        });
    }
  },
  data() {
    return {
      data: []
    };
  }
};
</script>