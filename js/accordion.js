function Accordion(options) {
  this.container = options.container;
  this.mainTitle = options.mainTitle;
  this.panels = options.panels;

  this.init();
}

//methods of the constructor are added to the prototype to save memery space
Accordion.prototype.print = function () {
  const template = '<div class="c-main_title">\
				<h1>' + this.mainTitle + '</h1>\
			</div>';
  var panels = '';
  for (i = 0; i < this.panels.length; i++) {
    panels += '<div class="ac-panel-container">\
				<div class="ac-panel_title">\
					<h2>' + this.panels[i].title + '</h3>\
					<h3>' + this.panels[i].subtitle + '</h3>\
				</div>\
				<div class="ac-panel_content">\
					' + this.panels[i].content + '\
				</div>\
			</div>';
  }
  const container = document.getElementById(this.container);
  container.innerHTML = template;
  container.insertAdjacentHTML('beforeend', panels);
};

Accordion.prototype.bindBehaviour = function () {
  this.accordionHeader = document.querySelectorAll('.ac-panel_title');

  for (i = 0; i < this.accordionHeader.length; i++) {
    console.log('o');
    this.accordionHeader[i].addEventListener('click', this.togglePanel, false);
  }

};

Accordion.prototype.togglePanel = function (e) {
  let content = e.target.nextElementSibling;
  if (content.classList.contains('ac--open')) {
    content.classList.remove('ac--open');
  } else {
    content.classList.add('ac--open');
  }
};

Accordion.prototype.init = function () {
  this.print();
  this.bindBehaviour();
};