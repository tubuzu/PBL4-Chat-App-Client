import { extendTheme } from "@chakra-ui/react";

export type Theme = {
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    hover: string;
  };
  border: {
    primary: string;
  };
  scrollBar: {
    track: string;
    thumb: string;
  };
  userSidebar: {
    backgroundColor: string;
    color: string;
    userSidebarItem: {
      selected: string;
      hover: {
        backgroundColor: string;
      };
    };
  };
  conversationSidebar: {
    backgroundColor: string;
    color: string;
    conversationItem: {
      selected: string;
      hover: {
        backgroundColor: string;
      };
      title: {
        color: string;
        lastMessageColor: string;
      };
    };
  };
  messagePanel: {
    backgroundColor: string;
    color: string;
    header: {
      title: string;
    };
    body: {
      content: {
        color: string;
      };
    };
    inputContainer: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
  };
  participantSidebar: {
    backgroundColor: string;
    color: string;
  };
  page: {
    backgroundColor: string;
  };
  input: {
    backgroundColor: string;
    color: string;
  };
};

export const DarkTheme: Theme = {
  background: {
    primary: "#161616", // 1E1D1D
    secondary: "#111",
    tertiary: "#141414",
    hover: "#3d3d3d",
  },
  text: {
    primary: "#fff",
    secondary: "#5f5f5f",
  },
  border: {
    primary: '0.4px solid #3d3d3d',
  },
  scrollBar: {
    track: "#111",
    thumb: "#3d3d3d",
  },
  userSidebar: {
    backgroundColor: "#161616",
    color: "#fff",
    userSidebarItem: {
      selected: "#3d3d3d !important",
      hover: {
        backgroundColor: "#2b2b2b",
      }
    }
  },
  conversationSidebar: {
    backgroundColor: "#161616",
    color: "#fff",
    conversationItem: {
      selected: "#3d3d3d !important",
      hover: {
        backgroundColor: "#202020",
      },
      title: {
        color: "#fff",
        lastMessageColor: "#9f9a9a",
      },
    },
  },
  messagePanel: {
    backgroundColor: "#161616",
    color: "#fff",
    header: {
      title: "#fff",
    },
    body: {
      content: {
        color: "#fff",
      },
    },
    inputContainer: {
      backgroundColor: "#212223",
      borderColor: "#3d3d3d",
      color: "#fff",
    },
  },
  participantSidebar: {
    backgroundColor: "#111",
    color: "#fff",
  },
  page: {
    backgroundColor: "#1a1a1a",
  },
  input: {
    backgroundColor: "#6b67677d",
    color: "#fff",
  },
};

export const LightTheme: Theme = {
  background: {
    primary: "#C1C1C1",
    secondary: "#fff",
    tertiary: "#ededed",
    hover: "",
  },
  text: {
    primary: "#000",
    secondary: "#636363",
  },
  border: {
    primary: '0.4px solid #3d3d3d',
  },
  scrollBar: {
    track: "",
    thumb: "",
  },
  userSidebar: {
    backgroundColor: "#15161E",
    color: "#fff",
    userSidebarItem: {
      selected: "",
      hover: {
        backgroundColor: "",
      }
    }
  },
  conversationSidebar: {
    backgroundColor: "#fff",
    color: "#000",
    conversationItem: {
      selected: "#D1D1D1",
      hover: {
        backgroundColor: "#D8D8D8",
      },
      title: {
        color: "#000",
        lastMessageColor: "#636363",
      },
    },
  },
  messagePanel: {
    backgroundColor: "#ededed",
    color: "#fff",
    header: {
      title: "#000",
    },
    body: {
      content: {
        color: "#000",
      },
    },
    inputContainer: {
      backgroundColor: "#fff",
      borderColor: "#3d3d3d",
      color: "#000",
    },
  },
  participantSidebar: {
    backgroundColor: "#fff",
    color: "#000",
  },
  page: {
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#ececec",
    color: "#595959",
  },
};

const config = {
  // initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const ChakraTheme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        color: "#fff",
      },
    },
  },
});
