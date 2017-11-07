/**
 * Created by sebastian on 02.05.17.
 */
import productPage from "../imports/ui/productPage";
import App from "../imports/ui/App";

var adminSection = FlowRouter.group({
    prefix: "/admin"
});

// for the /admin page
adminSection.route('/', {
    action: function() {}
});

// for the /admin/new-post page
adminSection.route('/new-post', {
    action: function() {}
});

FlowRouter.route('/', {
    name: 'blog',
    action: function(params, queryParams){
        ReactLayout.render(App);

    }
});

FlowRouter.route('/productpage',{
    name: 'productpage',
    action: function(params, queryParams){
        ReactLayout.render(productPage);
    }
});