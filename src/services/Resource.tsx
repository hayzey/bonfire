import axios from 'axios';
import { extend } from 'lodash';

export class Resource {
    static url: string = '';
    
    static resolveUrlWithParams(url: string, params: any = {}) {
        if (!url) {
            throw new Error('Error handling URL');
        }

        let _url = url;

        for (let key in params) {
            let value : string = params[key];

            if (_url.includes(`:${key}`)) {
                _url = _url.replace(`:${key}`, value);
            } else {
                _url = this.addQueryParamToUrl(_url, key, value);
            }
        };

        return _url;
    }

    static addQueryParamToUrl(url: string, key: string, value: string) {
        let _url = new URL(url);
        _url.searchParams.append(key, value);
        return _url.toString();
    }

    static getInstanceMethodParams(resource: Resource, params: object) {
        let _params = {};
        extend(_params, resource, params);
        return _params;
    }

    static query(params = {}) {
        return axios.get(
            this.resolveUrlWithParams(this.url, params)
        );
    }

    static get(params = {}) {
        return axios.get(
            this.resolveUrlWithParams(this.url, params)
        );
    }

    static delete(params = {}) {
        return axios.delete(
            this.resolveUrlWithParams(this.url, params)
        );
    }
    
    static post(params = {}, body = {}) {
        return axios.post(
            this.resolveUrlWithParams(this.url, params),
            body
        );
    }
    
    static patch(params = {}, body = {}) {
        return axios.patch(
            this.resolveUrlWithParams(this.url, params),
            body
        );
    }
    
    static put(params = {}, body = {}) {
        return axios.put(
            this.resolveUrlWithParams(this.url, params),
            body
        );
    }

    /* INSTANCE METHODS */
    get(params = {}) {
        let _params = Resource.getInstanceMethodParams(this, params);
        
        return axios.get(
            Resource.resolveUrlWithParams(Resource.url, _params)
        );
    }

    delete(params = {}) {
        let _params = Resource.getInstanceMethodParams(this, params);
        
        return axios.delete(
            Resource.resolveUrlWithParams(Resource.url, _params)
        );
    }
    
    post(params = {}, body = {}) {
        let _params = Resource.getInstanceMethodParams(this, params);
        
        return axios.post(
            Resource.resolveUrlWithParams(Resource.url, _params),
            body
        );
    }
    
    patch(params = {}, body = {}) {
        let _params = Resource.getInstanceMethodParams(this, params);
        
        return axios.patch(
            Resource.resolveUrlWithParams(Resource.url, _params),
            body
        );
    }
    
    put(params = {}, body = {}) {
        let _params = Resource.getInstanceMethodParams(this, params);
        
        return axios.put(
            Resource.resolveUrlWithParams(Resource.url, _params),
            body
        );
    }
    
};