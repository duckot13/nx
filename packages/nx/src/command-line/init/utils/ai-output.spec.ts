import { determineErrorCode } from './ai-output';

describe('determineErrorCode', () => {
  it('should map the legacy Angular version detection failure to UNSUPPORTED_PROJECT', () => {
    // Keep in sync with the message thrown in legacy-angular-versions.ts.
    expect(
      determineErrorCode(
        new Error('Could not determine the existing Angular version')
      )
    ).toBe('UNSUPPORTED_PROJECT');
  });

  it('should map a failed dot-nx wrapper verification to DOT_NX_SETUP_ERROR', () => {
    expect(
      determineErrorCode(
        new Error(
          "Command failed: ./nx --version | stderr: '.' is not recognized as an internal or external command"
        )
      )
    ).toBe('DOT_NX_SETUP_ERROR');
    expect(
      determineErrorCode(new Error('Command failed: .\\nx.bat --version'))
    ).toBe('DOT_NX_SETUP_ERROR');
  });

  it('should prefer DOT_NX_SETUP_ERROR over PACKAGE_INSTALL_ERROR when stderr mentions npm', () => {
    expect(
      determineErrorCode(
        new Error(
          "Command failed: ./nx --version\nError: Cannot find module 'nx/bin/nx'\nRun npm install"
        )
      )
    ).toBe('DOT_NX_SETUP_ERROR');
  });

  it('should still map package manager failures to PACKAGE_INSTALL_ERROR', () => {
    expect(
      determineErrorCode(
        new Error('Command failed: pnpm install --no-frozen-lockfile')
      )
    ).toBe('PACKAGE_INSTALL_ERROR');
    expect(
      determineErrorCode(
        new Error('Command failed: npm view nx@latest version')
      )
    ).toBe('PACKAGE_INSTALL_ERROR');
  });

  it('should fall through to UNKNOWN for unrecognized messages', () => {
    expect(determineErrorCode(new Error('something unexpected happened'))).toBe(
      'UNKNOWN'
    );
  });
});
