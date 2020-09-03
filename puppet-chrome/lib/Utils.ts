/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Protocol } from 'devtools-protocol';
import { debug } from '@secret-agent/commons/Debug';
import ExceptionDetails = Protocol.Runtime.ExceptionDetails;
import StackTrace = Protocol.Runtime.StackTrace;

export const debugError = debug('puppet-chrome:error');

export function exceptionDetailsToError(exceptionDetails: ExceptionDetails) {
  let message = exceptionDetails.text;
  if (exceptionDetails.exception) {
    message = exceptionDetails.exception.description || exceptionDetails.exception.value;
  } else if (exceptionDetails.stackTrace) {
    message += printStackTrace(exceptionDetails.stackTrace);
  }
  const error = new Error(message);
  error.stack = '';
  return error;
}

export function printStackTrace(stackTrace: StackTrace) {
  let message = '';
  for (const callframe of stackTrace.callFrames) {
    const location = `${callframe.url}:${callframe.lineNumber}:${callframe.columnNumber}`;
    const functionName = callframe.functionName || '<anonymous>';
    message += `\n    at ${functionName} (${location})`;
  }
  return message;
}
