export default {
  isLogin() {
    var token = localStorage.getItem("token");
    if (!token) return false;
    return true;
  },
  isLoading: false,
  scrolldirection:200,
  setScrollLoad(e, func) {
	  console.log(e);
    this.delScrollLoad()
    var txt = `    <div id="loadmore" style="width:100%; text-align: center;">
        <span style="text-align:center">正在加载...</span>
  </div>`;

    if (!window.onscroll) {
		
      window.onscroll = () => {

        let btm =  $(document).height() - $(document).scrollTop() - window.innerHeight;
        let bottomOfWindow = btm < 50;
        let direct = btm - this.scrolldirection;
        this.scrolldirection = btm;
		console.log(btm);
        if (direct <0 && bottomOfWindow && this.isLoading == false) {
          if ($('#loadmore').length < 1) {
            e.after($(txt));
          }
          this.isLoading = true;
          func();
        }
      };
    }
  },
  delScrollLoad() {
    this.isLoading = false;
    window.onscroll = '';
    var more = $('#loadmore');
    if (more.length > 0) {
      more.html("");
    }
  }
}