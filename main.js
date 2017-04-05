var model={
    cats:[
    {src:'cat1.jpg',counter:0,name:'tiger cat',url:'www.cat1.com'},
    {src:'cat2.jpg',counter:0,name:'hidden cat',url:'www.cat2.com'},
    {src:'cat3.jpg',counter:0,name:'two cats',url:'www.cat3.com'}],
    currentCat:null,
 };

var octupus={

    getCatList:function(){
        return model.cats;
    },

    getCurrentCat:function(){
        return model.currentCat;
    },

    setCurrentCat:function(currentCat){
        model.currentCat=currentCat;
    },

    incrementCounter:function(){
        model.currentCat.counter++;
        // should be careful that after the event is triggered,
        //render() must be called, since render()
        //is called first time when optucous.init(), at that time
        //render() gives default value.
        //So if you don't call render() again after the
        //event is triggered, the value will always be the default value.
        viewOfshowCat.render();
    },


    getInputValue:function(){
        return {
          catNameValue:document.querySelector('.name').value,
          clickValue:document.querySelector('.click').value
               };
    },

    openAdmin:function(){
       document.querySelector('.admin').style.visibility='visible';
    },

    closeAdmin:function(){
       document.querySelector('.admin').style.visibility='hidden';
    },

    init:function(){
        model.currentCat=model.cats[0];
        viewOfList.init();
        viewOfshowCat.init();
        viewOfAdmin.init();
    }

};

var viewOfList={
    init:function(){
        this.ul=document.querySelector('ul');
        this.render();
    },
    render:function(){
        var li,img;
        var catList=octupus.getCatList();
        this.ul.innerHTML='';
        for(var i=0;i<catList.length;i++){
            li=document.createElement('li');
            img=document.createElement('img');
            var cat=catList[i];
            img.src=cat.src;
            img.alt=cat.name;

            img.onclick=(function(catCopy){
                return function(){
                   octupus.closeAdmin();
                   octupus.setCurrentCat(catCopy);
                    // should be careful that after the event is triggered,
                    //render() must be called, since render()
                    //is called first time when optucous.init(), at that time
                    //render() gives default value.
                    //So if you don't call render() again after the
                    //event is triggered, the value will always be the default value.

                   viewOfshowCat.render();
                   viewOfAdmin.render();
                };

            })(cat);


            li.appendChild(img);
            this.ul.appendChild(li);
          }
}};

var viewOfshowCat={
    init:function(){
       this.imgList=document.querySelectorAll('ul li img');
       this.name=document.querySelector('.right .showCat .des');
       this.imgShow=document.querySelector('.right .showCat img');
       this.times=document.querySelector('.right .showCat .times');
       this.imgShow.onclick=function(){
       octupus.incrementCounter();

       };

       this.render();
    },
    render:function(){
       var curCat=octupus.getCurrentCat();
       this.name.textContent=curCat.name;
       this.imgShow.src=curCat.src;
       this.times.textContent=curCat.counter;


}};



var viewOfAdmin={
    init:function(){
        this.btn=document.querySelector('.btn');
        this.catName=document.querySelector('.name');
        this.url=document.querySelector('.url');
        this.click=document.querySelector('.click');
        this.cancel=document.querySelector('.cancel');
        this.save=document.querySelector('.save');

        this.render();
    },

    render:function(){
  // The correct order is: when click on the button, the admin panel shows up.
  // When click the image from the image list, the admin panel should disappear.
        var curCat=octupus.getCurrentCat();
         this.catName.value=curCat.name;
         this.url.value=curCat.url;
         this.click.value=curCat.counter;

         this.btn.onclick=function(){
            octupus.openAdmin();
         };
         this.cancel.onclick=function(){
            octupus.closeAdmin();
         };
         this.save.onclick=function(e){
             curCat.name=octupus.getInputValue().catNameValue;
             curCat.counter=octupus.getInputValue().clickValue;
             viewOfshowCat.render();
             e.preventDefault();
       };
    }
};


octupus.init();




