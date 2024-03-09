/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import type { Module } from "langium";
import { createLangiumGrammarServices } from "langium/grammar";
import {
	type LangiumSharedServices,
	type PartialLangiumSharedServices,
	startLanguageServer,
} from "langium/lsp";
import { NodeFileSystem } from "langium/node";
import {
	ProposedFeatures,
	createConnection,
} from "vscode-languageserver/node.js";
import { LangiumGrammarWorkspaceManager } from "./grammar-workspace-manager.js";

const connection = createConnection(ProposedFeatures.all);

export const LangiumGrammarSharedModule: Module<
	LangiumSharedServices,
	PartialLangiumSharedServices
> = {
	workspace: {
		WorkspaceManager: (services) =>
			new LangiumGrammarWorkspaceManager(services),
	},
};

const { shared } = createLangiumGrammarServices(
	{ connection, ...NodeFileSystem },
	LangiumGrammarSharedModule,
);
startLanguageServer(shared);
