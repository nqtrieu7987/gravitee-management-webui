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
class DocumentationDirective {
  constructor() {
    'ngInject';

    let directive = {
      scope: {
        filecontent: '=',
        filename: '='
      },
      link: function (scope, element) {
        element.bind('change', function (changeEvent) {
          let reader = new FileReader();
          var file = changeEvent.target.files[0];
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.filecontent = loadEvent.target.result;
              scope.filename = file.name;
            });
          };
          reader.readAsText(file);
        });
      }
    };

    return directive;
  }
}

export default DocumentationDirective;