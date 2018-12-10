/***********************************************
 * Reusable Accordion Component v1.0.0
 * Simple accordion created in pure Javascript.
 * https://github.com/angelarted/accordion-test/
***********************************************/


/**
 * Accordion constructor
 * @param container {string/mandatory} = the name of 'id' that will contain the accordion
 * @param mainTitle {string/optional} = the main title of the accordion
 * @param panels {objec/mandatory} = object containing accordion panels info 
*/
function Accordion(options) {
	
	this.container = options.container;
	this.mainTitle = options.mainTitle;
	this.panels = options.panels;

	this.init();
}

/*
 * Methods are added to the prototype 
 * to save memory space
*/
Accordion.prototype = {

	/*
	 * Building templates and printing HTML Accordion in DOM
	*/
	print: function(){
		//Templatas variable listing
		let mainTitle = '';
		let panels = '';
		let panelSubtitle = '';

		//Errors definitions, if some required option are not set
		if(this.container === undefined){
			throw new Error('You must define a container id');
		}
		if(this.panels === undefined){
			throw new Error('You must define at least one panel');
		}
		for(i=0;i<this.panels.length;i++){
			if(this.panels[i].title === undefined){
				throw new Error('Panel Title is required');
			}
			if(this.panels[i].content === undefined){
				throw new Error('Panel Content is required');
			}
		}

		//Managing 'maintTitle' optional existence
		mainTitle = this.mainTitle !== undefined ? '<div class="ac-row ac-main_title">\
				<h2 class="heading--h2">'+this.mainTitle+'</h2>\
			</div>' : '';

		//Filling panels template
		for (i=0; i<this.panels.length; i++){


			//Constructing subtitle template managing its optionability - one row constrain managed via css
			panelSubtitle = this.panels[i].subtitle !== undefined ? '<h4 class="heading--h4">\
				<div class="ellipsis-container">\
					'+this.panels[i].subtitle+'\
				</div>\
			</h4>' : '';

			//Final HTML panels template
			panels+= '<div class="ac-row ac-panel">\
						<div class="ac-panel_title">\
							<i class="ac-icon material-icons">keyboard_arrow_down</i>\
							<h3 class="heading--h3">'+this.panels[i].title+'</h3>\
							'+panelSubtitle+'\
						</div>\
						<div class="ac-panel_content">\
							<div class="absolute-container">\
								'+this.panels[i].content+'\
							</div>\
						</div>\
					</div>';
			}

		//Defining the html container for the accordion
		const container = document.getElementById(this.container);

		//Printing the main accordion title if exists
		if(mainTitle !== '') container.innerHTML = mainTitle;

		//Priting panels into the container
		container.insertAdjacentHTML('beforeend',panels);
	},

	/*
	 * Binging behaviour to target
	*/
	bindBehaviour: function(){

		//Defining sensible click area - sensible area managed via css
		this.accordionHeader = document.querySelectorAll('.ac-panel_title');

		//Binding the toggle behaviour to the panels title
		for(i=0;i <this.accordionHeader.length;i++){
			this.accordionHeader[i].addEventListener('click',this.togglePanel,false);
		}	
	},

	/*
	* Defining accordion behaviour
	*/
	togglePanel: function(e){
		/***
		 * Variables listing
		 * @panel = the container of the entire panel
		 * @content = the div containg hidden content, to be shown on click
		 * @contentHeihg = the height of the absolute positioned element wrapping the content
		*/
		let panel = e.target.parentNode;
		let content = e.target.nextElementSibling;
		let contentHeight = content.firstElementChild.offsetHeight;

		//Main accordion behaviour 		
		if(!panel.classList.contains('ac--open')){
			/***
			* Case 'open'
			* 1) Add class to the main panel wrapper
			* 2) Add class to the content wrapper (to be used on window resize)
			* 3) Set the height of the content to make slide-down work
			****/
			panel.classList.add('ac--open');
			content.classList.add('ac-content--open')
			content.style.height = contentHeight + 25; //25 is the container fixed padding

		} else {
			//Reverse if it is 'close' case
			panel.classList.remove('ac--open');
			content.classList.remove('ac-content--open');
			content.style.height = 0;
		}
	},

	/*
	 * Resize panel content height on window resize event
	*/
	onResize: function(){

		window.addEventListener('resize', function() {
			//Targeting all opened panels
			let activeElement = document.querySelectorAll('.ac-content--open');
        	
        	if(activeElement.length) {
           		
           		
        		for(i=0;i<activeElement.length;i++){
        			//Calculating new height of internal absolute div 
        			let newHeight = activeElement[i].firstElementChild.offsetHeight;
           			//Set container to new height
           			activeElement[i].style.height = newHeight + 25;//fixed padding
           		}
        	}
        });
	},

	//TO DO? CLOSE ALL PANELS WHEN ONE IS OPENED? 

	/*
	 * Accordion intialization
	*/
	init: function(){
		try{

			//Print accordion HTML in page
			this.print();
			//Attach behaviours to it
			this.bindBehaviour();
			//Attach behaviour for resize event
			this.onResize();

		} catch(error){
			console.error(error);
		}
	}
}