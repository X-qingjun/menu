var menu = (function () {
	return {
		init: function (ele, url) {
			this.$ele = $(ele);
			this.url = url;
			this.sendAjax();
		},
		event: function () {
			var $zz = $(".zz"),
				$box = $(".box"),
				$btn = $(".btn"),
				$layer = $('.layer');
			$('.box>div:not(.new)').on("click", function () {
				$(this).next().stop().slideToggle(400);
				$(this).find('i').toggleClass('shop-arrow-down').toggleClass('shop-arrow-up');
			})
			$box.on("click", function () {
				return false;
			})
			$btn.on("click", function () {
				$layer.html($(this).attr("attr_index"));
				$zz.show();
			})
			$zz.on('click', function () {
				$zz.hide();
			})
		},
		xuanran: function (data) {
			this.$ele.append($('<div class="zz"><div class="layer"></div></div><div class="menu_name">' + data[0].name + '</div>'));
			var arr = data[0].child;
			for (var j = 0; j < arr.length; j++) {
				this.$ele.append($('<li class="box"><div>' + arr[j].name + '<span>' + arr[j].content + '</span><i class="icon shop shop-arrow-down"></i></div><ul class="erji"></ul></li>'));
				var arr1 = arr[j].child;
				for (var k = 0; k < arr1.length; k++) {
					$($('.erji')[j]).append('<li><div><div>' + arr1[k].name + '</div><span>' + arr1[k].content + '</span><span><i class="icon shop shop-shizhong"></i>标签<i class="icon shop shop-dui"></i>标签</span></div><div class="op"><button class="btn" attr_index=' + (j + '-' + k) + '>弹窗</button></div></li>');
				}
				if (k > 2) {
					$($('.erji')[j]).append($('<li class="e"><div>查看剩余的二级标题<i class="icon shop shop-arrow-down"></i></div></li>'))
				}
			}
			if (j > 2) {
				this.$ele.append($('<div class="new">查看剩余的标题<i class="icon shop shop-arrow-down"></i></div>'))
			}
			this.event();
			this.judge("#menu>li");
			this.judge(".erji>li");
		},
		judge: function (doc) {
			var $new = $('.new'),
				$e = $('.e');
			if ($(doc).length > 2) {
				$(doc).eq(1).nextAll("li:not(.e)").hide();
				if (doc == "#menu>li") {
					$new.on('click', function () {
						$(doc + ":gt(1)").slideDown(400, function () {
							$new.slideUp();
						});
					})
				}
				if (doc == ".erji>li") {
					$e.on('click', function () {
						$(this).siblings().slideDown(400, function () {
							$e.slideUp();
						});
					})
				}
			}
		},
		sendAjax: function () {
			var _this = this;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", _this.url, true);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var result = JSON.parse(xhr.responseText);
						_this.xuanran(result);
					}
				}
			}
		}
	}
}())
menu.init("#menu", "js/menu.json");