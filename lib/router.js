/**
 * Created by sebastian on 02.05.17.
 */
import productPage from "../imports/ui/productPage";
import App from "../imports/ui/App";
import Product from "../imports/ui/Product.jsx";

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

FlowRouter.route('/productPage',{
    name: 'productPage',
    action: function(params, queryParams){
        ReactLayout.render(Product);
    }
});

FlowRouter.route('/submitPage',{
    name: 'submitPage',
    action: function(params, queryParams){
        ReactLayout.render(productPage)
    }
});