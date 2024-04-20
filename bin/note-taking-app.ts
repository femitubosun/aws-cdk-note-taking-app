#!/usr/bin/env node
import "source-map-support/register";
import { App, StackProps } from "aws-cdk-lib";
import { NoteTakingAppStack } from "../lib/note-taking-app-stack";
import * as logUtils from "../lambda-layer/logUtils";
import { AppContext } from "../types";
import gitBranch from 'git-branch'


class NoteTakingApp {
  constructor() {
    this.createStacks()
  }

  private async getAppContext(app: App): Promise<AppContext> {
    try {
      const currentBranch = await gitBranch();
      logUtils.logInfo(`Current git branch: ${currentBranch}`)

      const environments = app.node.tryGetContext('environments')
      const environment = environments.find((e: any) => e.branchName === currentBranch);

      logUtils.logInfo('Environment:');
      logUtils.logInfo(JSON.stringify(environment, null, 2));

      const globals = app.node.tryGetContext('globals')
      logUtils.logInfo('Globals:');
      logUtils.logInfo(JSON.stringify(globals, null, 2));
      
      return {...globals, ...environment}
    } catch (err: any) {
      logUtils.logInfo('Something went wrong')
      logUtils.logError(err);
      throw err
    }
  }

  private async createStacks() {
    const app = new App();
    const context = await this.getAppContext(app)

    const tags: {Environmet: string} = {
      Environmet: context.environment
    }

    const stackProps: StackProps = {
      env: {
          region: context.region,
          account: context.accountId,
      },
      stackName: `${context.appName}-stack-${context.environment}`,
      description: "Codygo backend task",
      tags
  };

  new NoteTakingAppStack(app, `${context.appName}-stack-${context.environment}`, stackProps, context)

  }
}

new NoteTakingApp();
