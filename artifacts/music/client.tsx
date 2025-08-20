import { Artifact } from '@/components/create-artifact';
import { TaylorSwiftDiscography } from '@/components/music/TaylorSwiftDiscography';
import { MusicIcon } from '@/components/icons';

interface MusicArtifactMetadata {
  artist?: string;
  album?: string;
  song?: string;
}

export const musicArtifact = new Artifact<'music', MusicArtifactMetadata>({
  kind: 'music',
  description: 'Taylor Swift discography browser with albums, songs, and details.',
  initialize: async ({ documentId, setMetadata }) => {
    // Initialize with default metadata
    setMetadata({
      artist: 'Taylor Swift',
    });
  },
  onStreamPart: ({ streamPart, setMetadata, setArtifact }) => {
    if (streamPart.type === 'data-musicSelection') {
      setMetadata((metadata) => {
        return {
          ...metadata,
          ...streamPart.data,
        };
      });
    }

    if (streamPart.type === 'data-musicContent') {
      setArtifact((draftArtifact) => {
        return {
          ...draftArtifact,
          content: streamPart.data.content || '',
          isVisible: true,
          status: 'idle',
        };
      });
    }
  },
  content: ({
    mode,
    status,
    content,
    isCurrentVersion,
    currentVersionIndex,
    onSaveContent,
    getDocumentContentById,
    isLoading,
    metadata,
  }) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MusicIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Loading music discography...</p>
          </div>
        </div>
      );
    }

    if (mode === 'diff') {
      const oldContent = getDocumentContentById(currentVersionIndex - 1);
      const newContent = getDocumentContentById(currentVersionIndex);

      return (
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Previous Selection</h3>
            <p className="text-sm text-muted-foreground">{oldContent}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Selection</h3>
            <p className="text-sm text-muted-foreground">{newContent}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full w-full">
        <TaylorSwiftDiscography />
      </div>
    );
  },
  actions: [
    {
      icon: <MusicIcon size={18} />,
      description: 'Browse albums',
      onClick: ({ setMetadata }) => {
        setMetadata((metadata) => ({
          ...metadata,
          view: 'albums',
        }));
      },
    },
  ],
});
