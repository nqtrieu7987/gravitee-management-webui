/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ApiEndpointController {
  constructor(ApiService, NotificationService, $scope, $rootScope, $state, $stateParams, resolvedApi) {
    'ngInject';
    this.ApiService = ApiService;
    this.NotificationService = NotificationService;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;

    this.resolvedApi = resolvedApi;
    this.api = resolvedApi.data;

    this.endpoint = _.find(this.api.proxy.endpoints, { 'name': $stateParams.endpointName});
    this.initialEndpoints = _.cloneDeep(this.api.proxy.endpoints);

    // Creation mode
    if (!this.endpoint) {
      this.endpoint = {
        weight: 1,
        healthcheck: true,
        http: {
          connectTimeout : 5000,
          idleTimeout : 60000,
          keepAlive : true,
          readTimeout : 10000,
          pipelining : false,
          maxConcurrentConnections : 100,
          useCompression : false
        }
      };

      this.api.proxy.endpoints.push(this.endpoint);
    }

    // Keep the initial state in case of form reset
    this.initialEndpoint = _.cloneDeep(this.endpoint);

    this.$scope.proxies = [
      {
        name: 'HTTP CONNECT proxy',
        value: 'HTTP'
      }, {
        name: 'SOCKS4/4a tcp proxy',
        value: 'SOCKS4'
      }, {
        name: 'SOCKS5 tcp proxy',
        value: 'SOCKS5'
      }];
  }

  update(api) {
    this.ApiService.update(api).then(() => {
      this.onApiUpdate();
    });
  }

  onApiUpdate() {
    this.$rootScope.$broadcast("apiChangeSuccess");
    this.NotificationService.show('Endpoint saved');
    this.$state.go('apis.admin.general.gateway');
  }

  reset() {
    this.$scope.formEndpoint.$setPristine();
    this.endpoint = _.cloneDeep(this.initialEndpoint);
  }

  backToGatewayConfiguration() {
    this.api.proxy.endpoints = _.cloneDeep(this.initialEndpoints);
    this.$state.go('apis.admin.general.gateway');
  }
}

export default ApiEndpointController;
