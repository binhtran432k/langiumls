# Langium Language Server

This project provides a Language Server Protocol (LSP) implementation for the
Langium language, enabling integration with various code editors beyond just
Visual Studio Code.

## Motivation

The official Langium library currently lacks a language server for editors
outside VSCode. This project aims to fill this gap by offering an LSP server
based on the Langium library, published on NPM for broader use.

## Neovim Tutorial

Here's how to configure Neovim to utilize the Langium Language Server:

1. **Add langiumls config to lspconfig**

```lua
local lspconfig = require("lspconfig")
require("lspconfig.configs").langiumls = {
  default_config = {
    -- Replace with the actual path to the Langium Language Server executable
    cmd = { "langiumls", "--stdio" },
    filetypes = { "langium" },
    single_file_support = true,
    root_dir = lspconfig.util.root_pattern("tsconfig.json", "package.json", "jsconfig.json", ".git"),
    settings = {
      langium = {
        build = {
          ignorePatterns = "node_modules, out",
        },
      },
    },
  },
}
```

2. **Setup Neovim for langiumls**

```lua
require("lspconfig").langiumls.setup({})
```
