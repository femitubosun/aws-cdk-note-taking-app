import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppContext } from '../types';

export class NoteTakingAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, context: AppContext) {
    super(scope, id, props);


  }
}
